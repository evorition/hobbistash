import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import authService from "../services/auth";
import { useNotification } from "../contexts/NotificationContext";
import AuthForm from "../components/AuthForm";

const signUpSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Repeat Password is required"),
});

const SignUpPage = () => {
    const { displayNotification } = useNotification();
    const navigate = useNavigate();

    const signUpFields = [
        {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "John Doe",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "name@example.com",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
        },
        {
            name: "passwordRepeat",
            label: "Password Repeat",
            type: "password",
            placeholder: "Password",
        },
    ];

    const onSubmit = async ({ username, email, password }) => {
        try {
            await authService.signup(username, email, password);
            navigate("/signin");
        } catch (error) {
            displayNotification(error);
        }
    };

    return (
        <AuthForm
            title="Sign Up"
            fields={signUpFields}
            schema={signUpSchema}
            onSubmit={onSubmit}
            submitButtonText="Sign Up"
        />
    );
};

export default SignUpPage;
