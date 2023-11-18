// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// import authService from "../services/auth";
import AuthForm from "../components/AuthForm";
// import { displayNotification } from "../reducers/notificationReducer";

const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Repeat Password is required"),
});

const SignUpPage = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const onSubmit = async (data) => {
    //     try {
    //         await authService.signup(data.name, data.email, data.password);
    //         navigate("login");
    //     } catch (error) {
    //         const errorMessage = error.response.data.message;
    //         dispatch(displayNotification(errorMessage));
    //     }
    // };

    const signUpFields = [
        {
            name: "name",
            label: "Name",
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

    return (
        <AuthForm
            title="Sign Up"
            fields={signUpFields}
            schema={signUpSchema}
            // onSubmit={onSubmit}
            submitButtonText="Sign Up"
        />
    );
};

export default SignUpPage;
