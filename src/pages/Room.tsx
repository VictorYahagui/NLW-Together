import logoImg from "../assets/images/logo.svg"
import { useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import "../styles/room.scss"
import { FormEvent, useState } from "react"
import { useAuth } from "../Hooks/useAuth"
import { database } from "../services/firebase"
type RoomParams = {
    id: string;
}

export function Room(){
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;
    async function handleSendQuestion(form: FormEvent) {
        form.preventDefault();
        if(newQuestion.trim() === '') {
            return;
        }
        if (!user){
            throw new Error('you must be logged in');
        }
        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswer: false
        };
        await database.ref(`rooms/${roomId}/questions`).push(question);
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <RoomCode code={params.id}/>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>sala</h1>
                    <span>4 perguntas</span>
                </div>
                <form action="" onSubmit={handleSendQuestion}>
                    <textarea name="" id="" rows="5" placeholder="Oque vai perguntar"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}></textarea>
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}