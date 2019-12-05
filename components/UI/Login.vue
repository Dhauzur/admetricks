<template>
  <div>
  <div class="dialogSession" v-if="title">
    {{ title }}
  </div>
  <div style="padding-left: 10px; padding-right: 10px;">
    <form @submit.prevent="handleSubmit">
      <Label>
        Usuario o email
      </Label>
      <Input
        type="text"
        name="email"
        v-model="form.email"
        autofocus
      />
      <FormHelper error v-if="attemptedSubmit && !$v.form.email.required">
        Por favor ingrese su correo electrónico
      </FormHelper>
      <Label >
        CONTRASEÑA
      </Label>
      <Input
        type="password"
        name="email"
        v-model="form.password"/>
      <span class="passFg">Olvide mi contraseña</span>
      <FormHelper error v-if="attemptedSubmit && !$v.form.password.required">
        Por favor ingrese su contraseña
      </FormHelper>
      <Button
        type="submit"
        color="primary"
        v-if="!isAuthLoading">
        Ingresar
      </Button>
      <div class="notAccount">
        ¿No tienes cuenta? Solicita una
        <a target="_blank"  href="mailto:cgarcia@centroenergia.cl?Subject=Solicitud%20cuenta%20en%20EE">aquí</a>
      </div>
      <Loader v-if="isAuthLoading" />
      <Message v-show="authError" error>
        {{ authError }}
      </Message>
    </form>
  </div>
  </div>

</template>

<script>
  import { mapMutations } from 'vuex';
  import { required } from 'vuelidate/lib/validators';
  import Label from './Label';
  import Input from './Input';
  import Button from './Button';
  import Message from './Message';
  import Loader from './Loader';
  import FormHelper from 'components/ui/FormHelper';


  export default {
    name: 'Landing',
    props: {
      title: String,
    },
    validations: {
      form: {
        email: { required },
        password: { required },
      }
    },
    computed: {
      authError () {
        return this.$store.state.auth.error;
      },
      isAuthLoading () {
        return this.$store.state.auth.status === 'loading';
      },
    },
    methods: {
      handleSubmit() {
        this.attemptedSubmit = true;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.$store.dispatch('auth/login', {
            email: this.form.email,
            password: this.form.password
          }).then((success) => {
            if (success) {
              this.$emit('success');
            }
          });
        }
      },
      ...mapMutations({
        hideSignupDialog: 'auth/hideSignupDialog',
      }),
    },
    components: {
      Label,
      Input,
      Button,
      Message,
      Loader,
      FormHelper
    },
    data: function() {
      return {
        form: {
          email: '',
          password: '',
        },
        attemptedSubmit: false
      };
    }
  }
</script>

<style media="screen">
  .dialogSession {
    padding: 10px; text-align: center; margin-bottom: 35px;
  }

  .passFg {
    display: block; margin-top: -20px; font-size: 12px; margin-bottom: 15px; cursor: pointer;
  }

  .passFg:hover {
    color: var(--primary-color);
  }

  .notAccount {
    padding: 10px;
    padding-top: 20px;
    text-align: center;
    display: block;
    font-size: 13px;
    color: var(--label-color);
  }

  button {
    width: 100%;
  }

</style>
