import { ref, reactive, inject } from 'vue'
import { useRouter } from "vue-router";
import { AbilityBuilder, Ability } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';

export default function useAuth() {
    const processing = ref(false)
    const validationErrors = ref({})
    const router = useRouter()

    const loginForm = reactive({
        email: '',
        password: '',
        remember: false
    })

    const registerForm = reactive({
        email: '',
        password: '',
        password_confirmation: ''
    })

    const user = reactive({
        name: '',
        email: ''
    })

    const ability = inject(ABILITY_TOKEN)
    const swal = inject('$swal')

    const getAbilities = async() => {
        axios.get('/api/abilities')
            .then(response => {
                const permissions = response.data
                const { can, rules } = new AbilityBuilder(Ability)

                can(permissions)

                ability.update(rules)
            })
    }

    const submitLogin = async () => {
        if (processing.value) return

        processing.value = true
        validationErrors.value = {}

        axios.post('/login', loginForm)
            .then(async response => {
                loginUser(response)
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => processing.value = false)
    }

    const loginUser = async (response) => {
        user.name = response.data.name
        user.email = response.data.email

        localStorage.setItem('loggedIn', JSON.stringify(true))
        await getAbilities()

        await router.push({ name: 'posts.index' })
    }

    const submitRegister = async () => {
        if(processing.value) return

        processing.value = true
        validationErrors.value = {}

        axios.post('/register', registerForm)
            .then(async response => {
                router.push({name: 'login'})
            })
            .catch(error => {
                if(error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => processing.value = false)
    }

    const getUser = () => {
        axios.get('/api/user')
            .then(response => {
                loginUser(response)
            })
    }

    const logout = async () => {
        if (processing.value) return

        processing.value = true

        axios.post('/logout')
            .then(response => router.push({ name: 'login' }))
            .catch(error => {
                swal({
                    icon: 'error',
                    title: error.response.status,
                    text: error.response.statusText
                })
            })
            .finally(() => {
                processing.value = false
            })
    }

    return { loginForm, registerForm, validationErrors, processing, submitLogin, submitRegister, user, getUser, logout, getAbilities }
}
