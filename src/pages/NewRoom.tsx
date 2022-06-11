import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

import { database } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss"

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const navigate = useNavigate();

    async function handleCreateRoom (event: FormEvent){

        event.preventDefault();
        if (newRoom.trim()===''){
            return;
        }
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });
        navigate(`/rooms/${firebaseRoom.key}`);
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
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom} action="">
                        <input type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit"> Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente ?
                        <Link to="/">
                            Clique aqui
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
