import AppBar from "./AppBar";
import Sidebar from "./Sidebar";

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen">
            {/* Conteúdo principal com Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar only visible on large screens and above */}
                <aside className="hidden md:block lg:w-64">
                    <Sidebar />
                </aside>

                {/* AppBar only visible on small and medium screens */}
                <nav className="md:hidden">
                    <AppBar />
                </nav>

                <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default NavbarWrapper;
