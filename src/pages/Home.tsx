import { useNavigate } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss"

import { Button } from "../components/Button";
import { useAuth } from "../Hooks/useAuth";

export function Home() {
    const navigate = useNavigate();
    const {user, signInWithGoogle } = useAuth();

    async function handleCreateRoom(){
        if (!user) {
            await signInWithGoogle();
        }
        navigate('/rooms/new');
    };

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração" />
                <strong>Crie salas de Q&amp;A ao-vivo </strong>
                <p>Tire as dúvidas da sua audiéncia</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleImg} alt="Logo Google" />
                        Crie sua sala
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form action="">
                        <input type="text" 
                        placeholder="Digite o codigo da sala"
                        />
                        <Button type="submit"> Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}