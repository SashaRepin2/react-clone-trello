import React from "react";

import styles from "./Accordion.module.scss";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.container}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
