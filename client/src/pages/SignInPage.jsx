import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import authService from "../services/auth";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import AuthForm from "../components/AuthForm";

const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const SignInPage = () => {
    const { saveUser } = useUser();
    const { displayNotification } = useNotification();
    const navigate = useNavigate();

    const signInFields = [
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
    ];

    const onSubmit = async ({ email, password }) => {
        try {
            const user = await authService.signin(email, password);
            saveUser(user);
            navigate("/");
        } catch (error) {
            displayNotification(error);
        }
    };

    return (
        <AuthForm
            title="Sign In"
            fields={signInFields}
            schema={signInSchema}
            onSubmit={onSubmit}
            submitButtonText="Sign In"
        />
    );
};

export default SignInPage;
