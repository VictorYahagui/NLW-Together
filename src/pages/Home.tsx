import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { database } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss"

import { Button } from "../components/Button";
import { useAuth } from "../Hooks/useAuth";

export function Home() {
    const navigate = useNavigate();
    const {user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    async function handleCreateRoom(){
        if (!user) {
            await signInWithGoogle();
        }
        navigate('/rooms/new');
    };
   async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        if (roomCode.trim()===''){
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        if (!roomRef.exists()){
             return alert('Room does not exists.');

        }
        navigate(`/rooms/${roomCode}`)
   }
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
                    <form onSubmit={handleJoinRoom} action="">
                        <input type="text" 
                        placeholder="Digite o codigo da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit"> Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}