export default function Button({ children, type, variant }) {
    const variants = {
        icon: "size-fit cursor-pointer",
        text: "text-base size-fit min-w-[5em] h-[2em] px-2 rounded-md bg-primary text-white cursor-pointer"
    }

    return (
        <button className={`${variants[variant]}`} type={type}>
            {children}
        </button>
    );
}