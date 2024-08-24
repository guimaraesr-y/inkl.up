const Container = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="max-w-2xl w-3/4 mx-auto p-4">
            {children}
        </div>
    )
}

export default Container;