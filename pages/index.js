import Head from "next/head";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import styled from "styled-components";
import { useState } from "react";

export default function Home() {
  const [searchId, setSearchId] = useState("");

  const search = (e) => {
    e.preventDefault();
    if (searchId.length > 0) {
      Router.push(`/profile/${searchId}`);
    }
  };

  return (
    <div className={styles.container}>

      <h1>My League of Legends Profile</h1>
      <SearchContainer>
        <SearchForm onSubmit={search}>
          <input
            placeholder="Summoner Id..."
            onChange={(e) => setSearchId(e.target.value)}
          />
        </SearchForm>
      </SearchContainer>

      <footer className={styles.footer}>
        <div>
          <a
            href="http://portfolio.ruitangcs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed and created by Rui Tang
          </a>
        </div>
        <p>LOL Profile isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
      </footer>
    </div>
  );
}

const SearchContainer = styled.div``;

const SearchForm = styled.form``;
