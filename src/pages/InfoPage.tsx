import React from "react";

const InfoPage: React.FC = () => {
    return (
        <div className="container information">
            <p>Суть проекта: поиск по фильмам, при авторизации открывается возможность добавлять фильмы в закладки.</p>
            <p>Используемые технологии: React, Redux, TypeScript, ESLint, SASS. Firebase databse.</p>
            <p>
                <a href="https://zloybatarejka.github.io/portofolio/" target="_blank" rel="noopener noreferrer">
                    Портфолио
                </a>
            </p>
        </div>
    );
};

export default InfoPage;
