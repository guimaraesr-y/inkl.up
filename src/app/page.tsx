import GoogleLoginButton from '@/components/googleLoginButton/GoogleLoginButton';
import Logo from '@/components/logo/logo';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>inkl.up - Save and Share Your Links</title>
                <meta name="description" content="Simplify your online presence with inkl.up. Save and share your most important links in one place." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-gradient-to-br md:bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white px-8 py-16 md:py-0">
                <div className='flex flex-col items-center justify-center min-h-screen max-w-[300px] md:max-w-[800px] mx-auto'>
                    <div className="flex flex-col items-center gap-6">
                        <div className='w-1/2'>
                            <Logo />
                        </div>
                        <p className="text-md md:text-xl font-light max-w-lg text-center">
                            Simplifique sua presença online. Salve e compartilhe seus links mais importantes em um só lugar.
                        </p>
                        <GoogleLoginButton />
                    </div>

                    <section className="mt-16 text-center max-w-3xl mx-auto">
                        <h2 className="text-lg md:text-2xl font-semibold mb-6">Vantagens de linkar com a gente</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            <div className="flex flex-col gap-2 items-center bg-gray-100 bg-opacity-10 rounded-lg p-4 filter backdrop-blur-md">
                                <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11c0 1.657-2.686 3-6 3s-6-1.343-6-3 2.686-3 6-3 6 1.343 6 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14.5v5.25M15.5 20.5h-7" /></svg>
                                <h3 className="font-semibold text-lg">Fácil de Usar</h3>
                                <p className="text-sm">Uma plataforma simples e intuitiva que permite gerenciar seus links sem esforço.</p>
                            </div>

                            <div className="flex flex-col gap-2 items-center bg-gray-100 bg-opacity-10 rounded-lg p-4 filter backdrop-blur-md">
                                <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2-2m0 0l2 2m-2-2v6m2-6l2 2m0 0l2-2m-2 2v6" /></svg>
                                <h3 className="font-semibold text-lg">Organização de Links</h3>
                                <p className="text-sm">Mantenha todos os seus links importantes organizados em um lugar, acessíveis a qualquer momento.</p>
                            </div>

                            <div className="flex flex-col gap-2 items-center bg-gray-100 bg-opacity-10 rounded-lg p-4 filter backdrop-blur-md">
                                <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M12 4a8 8 0 110 16 8 8 0 010-16z" /></svg>
                                <h3 className="font-semibold text-lg">Login Seguro</h3>
                                <p className="text-sm">Faça login de forma segura com sua conta do Google, com todos os seus dados seguros e privados.</p>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
