"use client";

import Image from "next/image";
import useSearch from "../hooks/useSearch";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-1 justify-end items-center gap-3">
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex border ease-in-out"
        animate={{
          paddingLeft: isOpen ? 18 : 10,
          paddingRight: isOpen ? 14 : 10,
          paddingTop: isOpen ? 8 : 10,
          paddingBottom: isOpen ? 8 : 10,
          borderRadius: isOpen ? 999 : 10,
          gap: isOpen ? 8 : 0,
          justifyContent: isOpen ? "start" : "center",
          width: "auto",
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence initial={false} mode="wait">
          {isOpen ? (
            <>
              <motion.input
                key="input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="outline-none typo-body2-normal text-black"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />

              <Image
                src="/svgs/search.svg"
                alt="search-icon"
                width={20}
                height={20}
              />
            </>
          ) : (
            <motion.button
              key="search-button"
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
              aria-label="검색 열기"
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/svgs/search.svg"
                alt="search-icon"
                width={20}
                height={20}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.form>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            key="closeBtn"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="typo-body2-normal font-bold py-1"
          >
            닫기
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
