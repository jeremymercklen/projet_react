import AuthGuard from '../domains/auth/AuthGuard'

function Home() {
    return (
        <div>Home</div>
    )
}

export default AuthGuard(Home);