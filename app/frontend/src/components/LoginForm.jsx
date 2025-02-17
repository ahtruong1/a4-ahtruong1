import FormInput from "./FormInput.jsx";
import Button from "./Button.jsx";

export default function LoginForm({ submitHandler }) {
    return (
        <form id="login-form" className="grid justify-items-start gap-4" onSubmit={submitHandler}>
            <div className="w-full grid justify-items-start">
                <FormInput type="email" name="email" label="Email" form="login-form"/>
            </div>
            <div className="w-full grid justify-items-start">
                <FormInput type="password" name="password" label="Password" form="login-form"/>
            </div>
            <Button type="submit" variant="text" form="login-form">Login</Button>
        </form>
    );
}