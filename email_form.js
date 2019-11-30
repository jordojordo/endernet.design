"use strict";

const e = React.createElement;

const emailjs = require("emailjs-com");
const toastr = require("toastr");

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      errors: {
        email: "",
        message: ""
      },
      formValid: false,
      sent: false
    };
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value, formValid: true });
  }

  sentMessage(event) {
    if (this.state.formValid) {
      event.preventDefault();

      const templateParams = {
        from_name: this.state.email,
        message_html: this.state.message
      };

      emailjs
        .send("mailgun", "jl_com", templateParams, "user_6q1Vm28wpv74g45oywen5")
        .then(response => {
          toastr.success("Message sent successful");
          console.log("SUCCESS!", response.status, response.text);
        });

      this.setState({
        email: "",
        message: "",
        sent: true
      });
    } else {
      React.createElement("div", "You suck");
    }
  }

  render() {
    if (this.state.sent) {
      return React.createElement(
        "div",
        {
          className: "email-success"
        },
        "email sent!"
      );
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        {
          className: "email-form",
          id: this.props.id,
          name: this.props.name,
          method: this.props.method,
          action: this.props.action
        },
        React.createElement("input", {
          className: "email-input",
          type: "email",
          name: "email",
          placeholder: "email",
          value: this.state.email,
          onChange: this.handleInputChange.bind(this),
          error: this.state.errors.email,
          required: true
        }),
        React.createElement("input", {
          className: "message-input",
          type: "textarea",
          id: "message",
          name: "message",
          placeholder: "message",
          value: this.state.message,
          onChange: this.handleInputChange.bind(this),
          error: this.state.errors.message,
          required: true
        }),
        React.createElement(
          "button",
          {
            className: "submit-button",
            onClick: this.sentMessage.bind(this)
          },
          "submit"
        )
      )
    );
  }
}

const domContainer = document.querySelector("#email_form");
ReactDOM.render(e(EmailForm), domContainer);
