import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import APILogin from './APILogin'
import { Link } from 'react-router-dom'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignInForm extends Component {

  state = {
    username: '',
    password: ''
  }



handleSubmit = (event) => {
  event.preventDefault()
    APILogin.signin(this.state)
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        this.props.signin(this.state.username, data.token, data.user)
        this.props.history.push('/projects')
      }
    })
  }

handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }


render() {

    const { username, password } = this.state
    const { handleChange, handleSubmit } = this

  return (
  <div className="login_input">
          <LockOutlinedIcon className="login_input"/>
        <Typography className="login_input">
          Sign in
        </Typography>
        <form onSubmit={this.handleSubmit} className="login_input">
          <FormControl >
            <InputLabel >Username</InputLabel>
            <Input id="username" name="username" autoComplete="current-username" className="login_input" value={this.state.username} onChange={this.handleChange} autoFocus />
          </FormControl>
          <p></p>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange} />
          </FormControl>
          <p></p>
      
          <p></p>
          <Button
            type="submit"
            className="login_input"
            variant="contained"
            color="purple"
          >
            Sign in
          </Button>
        </form>

        <h3>Not signed up yet? Register <Link to={'/signup'}>here.</Link></h3>

    </div>
  );
}
}



export default withStyles(styles)(SignInForm);
