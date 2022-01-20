import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import createPaywallLink from "../../utils/createPaywallLink";
import styles from "./CreatePaywallLink.module.css";
import CreatePaywallLinkForm from "./CreatePaywallLinkForm";

export default function CreatePaywallLink({ avatarUrl, currencies, error }) {
  const { query, isReady } = useRouter();
  const [paywallLink, setPaywallLink] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const currency = currencies.find(
    ({ isDefaultCurrency }) => isDefaultCurrency
  )?.currency;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const paywallLink = await createPaywallLink({
      username: query.username,
      title: e.target.title.value,
      currency,
      amount: e.target.amount.value,
      redirectUrl: e.target.redirectUrl.value,
    });

    setPaywallLink(paywallLink);
    setIsLoading(false);
  };

  return isReady ? (
    <div className={styles.root}>
      {error?.status === 404 && (
        <h1>Doh! There is no Strike user with username {query.username}.</h1>
      )}
      {!error && (
        <>
          <div className={styles.usernameContainer}>
            <div className={styles.avatarContainer}>
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="user avatar"
                  layout="fill"
                  className={styles.avatar}
                />
              )}
            </div>
            <h1 className={styles.h1}>{query.username}</h1>
          </div>
          <p>
            Customize your paywall settings. All funds will be converted and
            credited to{" "}
            <a
              href={`https://strike.me/${query.username}`}
              target="_blank"
              rel="noreferrer"
            >
              {query.username}
            </a>
          </p>
          <CreatePaywallLinkForm
            currency={currency}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </>
      )}
      <br />
      {paywallLink && (
        <div>
          <h2>Paywall Link Created 🎉</h2>
          <Link href={paywallLink}>
            <a>{paywallLink}</a>
          </Link>
        </div>
      )}
    </div>
  ) : null;
}
