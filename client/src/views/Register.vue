<template>
<div class="registerpage">
  <form class="register-form" @submit.prevent="register">
  <h1>Register Form</h1><br/>
    <label class="field a-field a-field_a1">
      <input type='text' class="username-input field__input a-field__input"
      v-model="username"
      placeholder="input username"
      required />
      <span class="a-field__label-wrap">
        <span class="a-field__label">Username</span>
      </span>
    </label><br/>
    <label class="field a-field a-field_a1">
      <input type='text' class="email-input field__input a-field__input"
      v-model="email"
      placeholder="input email"
      required />
      <span class="a-field__label-wrap">
        <span class="a-field__label">Email</span>
      </span>
    </label><br/>
    <label class="field a-field a-field_a1">
      <input type='password' class="field__input a-field__input"
      placeholder="input password"
      v-model="password"
      required />
      <span class="a-field__label-wrap">
        <span class="a-field__label">Password</span>
      </span>
    </label>
    <label class="field a-field a-field_a1">
      <input type='password' class="field__input a-field__input"
      placeholder="verify password"
      v-model="verifyPassword"
      required />
      <span class="a-field__label-wrap">
        <span class="a-field__label">Verify Password</span>
      </span>
    </label><br/><br/>
    <input class="btn btn-outline-secondary" type="submit" value="Register" /><br/><br/>
    <div class="row justify-content-center">
      <a class="navigation-link" href="#" @click.prevent="login"> I have an Account</a>
    </div>
  </form>
</div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      verifyPassword: ''
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    register () {
      if (this.password === this.verifyPassword) {
        this.$store.dispatch('register', { username: this.username, email: this.email, password: this.password })
          .then((data) => {
            console.log('Success')
            localStorage.setItem('access_token', data.access_token)
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('Verify Password Mismatch')
      }
    }
  }
}
</script>

<style>
.registerpage{
  margin-top: 100px;
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-form{
  width: 800px;
  height: 500px;
  background: rgba(245, 245, 245, 0.9);
  padding: 50px;
  border-radius: 50px;
}

/*
=====
LEVEL 1. RESET STYLES
=====
*/

.field {
  --uiFieldPlaceholderColor: var(--fieldPlaceholderColor, #767676);
  margin-left: 5px;
  margin-right: 5px;
}

.field__input {
  background-color: transparent;
  border-radius: 0;
  border: none;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;
}

.field__input:focus::-webkit-input-placeholder {
  color: var(--uiFieldPlaceholderColor);
}

.field__input:focus::-moz-placeholder {
  color: var(--uiFieldPlaceholderColor);
  opacity: 1;
}

/*
=====
LEVEL 2. CORE STYLES
=====
*/

.a-field {
  display: inline-block;
}

.a-field__input {
  display: block;
  box-sizing: border-box;
  width: 200px;
}

.a-field__input:focus {
  outline: none;
}

/*
=====
LEVEL 3. PRESENTATION STYLES
=====
*/

/* a-field */

.a-field {
  --uiFieldHeight: var(--fieldHeight, 2.5rem);
  --uiFieldBorderWidth: var(--fieldBorderWidth, 2px);
  --uiFieldBorderColor: var(--fieldBorderColor);

  --uiFieldFontSize: var(--fieldFontSize, 1rem);
  --uiFieldHintFontSize: var(--fieldHintFontSize, 1rem);

  --uiFieldPaddingRight: var(--fieldPaddingRight, 1rem);
  --uiFieldPaddingBottom: var(--fieldPaddingBottom, 1rem);
  --uiFieldPaddingLeft: var(--fieldPaddingLeft, 1rem);

  position: relative;
  box-sizing: border-box;
  font-size: var(--uiFieldFontSize);
  padding-top: 1rem;
}

.a-field__input {
  height: var(--uiFieldHeight);
  padding: 0 var(--uiFieldPaddingRight) 0 var(--uiFieldPaddingLeft);
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColor);
}

.a-field__input::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity .2s ease-out;
}

.a-field__input::-moz-placeholder {
  opacity: 0;
  transition: opacity .2s ease-out;
}

.a-field__input:not(:placeholder-shown)~.a-field__label-wrap .a-field__label {
  opacity: 0;
  bottom: var(--uiFieldPaddingBottom);
}

.a-field__input:focus::-webkit-input-placeholder {
  opacity: 1;
  transition-delay: .2s;
}

.a-field__input:focus::-moz-placeholder {
  opacity: 1;
  transition-delay: .2s;
}

.a-field__label-wrap {
  box-sizing: border-box;
  width: 100%;
  height: var(--uiFieldHeight);

  pointer-events: none;
  cursor: text;

  position: absolute;
  bottom: 0;
  left: 0;
}

.a-field__label {
  position: absolute;
  left: var(--uiFieldPaddingLeft);
  bottom: calc(50% - .5em);

  line-height: 1;
  font-size: var(--uiFieldHintFontSize);

  pointer-events: none;
  transition: bottom .2s cubic-bezier(0.9, -0.15, 0.1, 1.15), opacity .2s ease-out;
  will-change: bottom, opacity;
}

.a-field__input:focus~.a-field__label-wrap .a-field__label {
  opacity: 1;
  bottom: var(--uiFieldHeight);
}

/* a-field_a1 */

.a-field_a1 .a-field__input {
  transition: border-color .2s ease-out;
  will-change: border-color;
}

.a-field_a1 .a-field__input:focus {
  border-color: var(--fieldBorderColorActive);
}

/* a-field_a2 */

.a-field_a2 .a-field__label-wrap::after {
  content: "";
  box-sizing: border-box;
  width: 0;
  height: var(--uiFieldBorderWidth);
  background-color: var(--fieldBorderColorActive);

  position: absolute;
  bottom: 0;
  left: 0;

  will-change: width;
  transition: width .285s ease-out;
}

.a-field_a2 .a-field__input:focus~.a-field__label-wrap::after {
  width: 100%;
}

/* a-field_a3 */

.a-field_a3 {
  padding-top: 1.5rem;
}

.a-field_a3 .a-field__label-wrap::after {
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 0;

  opacity: 0;
  border: var(--uiFieldBorderWidth) solid var(--fieldBorderColorActive);

  position: absolute;
  bottom: 0;
  left: 0;

  will-change: opacity, height;
  transition: height .2s ease-out, opacity .2s ease-out;
}

.a-field_a3 .a-field__input:focus~.a-field__label-wrap::after {
  height: 100%;
  opacity: 1;
}

.a-field_a3 .a-field__input:focus~.a-field__label-wrap .a-field__label {
  bottom: calc(var(--uiFieldHeight) + .5em);
}

/*
=====
LEVEL 4. SETTINGS
=====
*/

.field {
  --fieldBorderColor: #D1C4E9;
  --fieldBorderColorActive: #673AB7;
}

.register-form span {
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
}

.username-input,
.email-input {
  width: 410px;
}

.navigation-link {
  font-size: 12px;
}

</style>
