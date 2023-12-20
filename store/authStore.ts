import { defineStore } from "pinia";
import { authLogin } from "~/api/index";
import { reloadNuxtApp } from "nuxt/app";
import { el } from "element-plus/es/locale";
import { ElMessage } from 'element-plus'

const checkLicenseFn = () => {
  let info = useCookie('info').value
  if (info) {
    if (info.hasOwnProperty('checkLicense')) {
      return true
    }
  } else {
    return false
  }


}
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: ref(useCookie('token').value),
    permissions: ref(useCookie('permissions').value),
    isLogin: ref(!!useCookie('token').value),
    checkLicense: ref(checkLicenseFn()),
  }),
  actions: {
    async login(data) {
      const cookieMail = useCookie('mail', { maxAge: 60 * 60 * 24 * 7 })
      cookieMail.value = data.email
      const cookiePassword = useCookie('password', { maxAge: 60 * 60 * 24 * 7 })
      cookiePassword.value = data.password
      let { data: loginData }: any = await authLogin(data)
      if (loginData.value.code != 400) {
        const cookieTempToken = useCookie('tempToken', { maxAge: 60 * 60 * 24 * 7 })
        cookieTempToken.value = loginData.value.data.token
        if (loginData.value.data.hasOwnProperty('checkLicense')) {
          if (loginData.value.data.checkLicense) {
            this.setLoginData(loginData)
            this.checkLicense = true
          }
        }
      } else {
        ElMessage.error(loginData.value.message)
      }
      return loginData.value
    },
    async verificationPassed() {
      const cookieMail = useCookie('mail', { maxAge: 60 * 60 * 24 * 7 })
      const cookiePassword = useCookie('password', { maxAge: 60 * 60 * 24 * 7 })
      let data = {
        "email": cookieMail.value,
        "password": cookiePassword.value,
        "role": "ROLE_USER"
      }
      await this.login(data)
    },
    setLoginData(loginData) {
      loginData = loginData.value.data
      this.token = loginData.token
      this.isLogin = true
      const cookieToken = useCookie('token', { maxAge: 60 * 60 * 24 * 7 })
      cookieToken.value = this.token
      this.setPermissions(loginData.role)
      const cookieInfo = useCookie('info', { maxAge: 60 * 60 * 24 * 7 })
      cookieInfo.value = JSON.stringify(loginData)
      // this.reloadPage()
    },
    googleLogin(data) {
      this.token = data.token
      this.isLogin = true
      const cookieToken = useCookie('token', { maxAge: 60 * 60 * 24 * 7 })
      cookieToken.value = this.token
      const cookiePermissions = useCookie('permissions', { maxAge: 60 * 60 * 24 * 7 })
      cookiePermissions.value = data.role
      const cookieInfo = useCookie('info', { maxAge: 60 * 60 * 24 * 7 })
      cookieInfo.value = JSON.stringify(data)
      this.reloadPage()
    },
    setPermissions(roleList) {
      let permissions = roleList[0].authority
      this.permissions = permissions
      const cookiePermissions = useCookie('permissions', { maxAge: 60 * 60 * 24 * 7 })
      cookiePermissions.value = permissions
    },
    async signOut() {
      this.isLogin = false
      const cookieInfo = useCookie('info')
      cookieInfo.value = null
      const cookieToken = useCookie('token')
      cookieToken.value = null
      const cookiePermissions = useCookie('permissions')
      cookiePermissions.value = null
      this.checkLicense = false
      this.reloadPage()
    },
    reloadPage() {
      const router = useRouter();
      router.push({ path: '/' })
    }
  }
})