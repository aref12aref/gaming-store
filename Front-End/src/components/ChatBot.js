import "./chatBoxStyle.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import { BASE_URL, chatbot_URL } from "../AxiosAPIs";
import axios from "axios";

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [ques, setQues] = useState("");
    const [chat, setChat] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        const question = ques;
        const response = await axios
            .post(`${BASE_URL}/${chatbot_URL}/answers`, {
                question,
            })
            .catch((e) => console.log(e));

        const answers = response.data.data.map((a) => {
            return a.answer;
        });

        let newChat = [];

        if (answers.length !== 0) {
            newChat = [{ message: answers.join(), from: "bot" }];
        } else {
            newChat = [
                {
                    message:
                        "sorry! I couldn't understand, can you ask again please?",
                    from: "bot",
                },
            ];
        }

        newChat.push({ message: ques, from: "user" });
        newChat.push(...chat);
        setChat(newChat);
    }

    function handledeletechat(e) {
        e.preventDefault();
        setChat([]);
    }

    const showChat = chat.map((c, index) => {
        return (
            <p
                key={index}
                className={c.from === "user" ? "userMessage" : "botMessage"}
            >
                {c.message}
            </p>
        );
    });

    return (
        <div style={{ position: "sticky", top: "50%" }}>
            <div className="chatbox">
                <header className="chatbox-header">
                    <h6>how can I help you?</h6>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        className="btn-warning"
                    >
                        help
                    </Button>
                </header>

                <div style={{ minHeight: "150px" }}>
                    <Collapse in={open} dimension="height">
                        <div id="example-collapse-text">
                            <Card
                                body
                                style={{ height: "297px" }}
                                className="chatbot-card"
                            >
                                <main className="chatbox-main">{showChat}</main>
                                <div className="chatbox-footer">
                                    <input
                                        type="text"
                                        placeholder="Ask a Question"
                                        value={ques}
                                        onChange={(e) =>
                                            setQues(e.target.value)
                                        }
                                    />
                                    <button
                                        onClick={(e) => {
                                            setQues("");
                                            handleSubmit(e);
                                        }}
                                        className="btn btn-success"
                                        style={{
                                            width: "40px",
                                            textAlign: "center",
                                            fontSize: "12px",
                                            borderRadius: "0",
                                        }}
                                    >
                                        /\
                                    </button>
                                    <button
                                        onClick={(e) => handledeletechat(e)}
                                        className="btn btn-danger"
                                        style={{
                                            width: "40px",
                                            textAlign: "center",
                                            fontSize: "12px",
                                            borderRadius: "0",
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}
