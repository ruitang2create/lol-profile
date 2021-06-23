import Router from "next/router";
import styles from '../styles/Home.module.css'
import { useState } from "react";
import Layout from "../components/layout";
import Hero from "../components/hero";

export default function Home() {
  const [searchId, setSearchId] = useState("");

  const search = (e) => {
    e.preventDefault();
    if (searchId.length > 0) {
      Router.push(`/profile/${searchId}`);
    }
  };

  return (
    <Layout home={true}>
      <div className={styles.homePageContainer}>
        <div className={styles.ContentWrapper}>
          <Hero />
          <div className={styles.SearchContainer}>
            <form className={styles.SearchForm} onSubmit={search}>
              <input
                className={styles.SearchInput}
                placeholder="Summoner Id..."
                onChange={(e) => setSearchId(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}