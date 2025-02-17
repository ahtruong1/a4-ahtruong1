
export default function TableSelect({ form }) {
    return (
        <select className="w-[100%] border-box border-gray-500 rounded-md px-1 mx-1" name="major" form={form}>
            <option value="Biomedical Engineering">Biomedical Engineering</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Data Science">Data Science</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Robotics Engineering">Robotics Engineering</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Electrical & Computer Engineering">Electrical & Computer Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Environmental Engineering">Environmental Engineering</option>
            <option value="Business">Business</option>
        </select>
    );
}