import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { imageData } from "@/recoil/selectors/imageSelectors";
import { pageState } from "@/recoil/atoms/pageState";
import { useEffect, useState, useMemo } from "react";
import { searchState } from "@/recoil/atoms/searchState";
import styles from "./CommonFooter.module.scss";

function CommonFooter() {
  const imgSelector = useRecoilValueLoadable(imageData);
  const search = useRecoilValue(searchState);
  const [page, setPage] = useRecoilState(pageState);
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    setCurrentGroup(0);
  }, [search]);

  const paginationData = useMemo(() => {
    if (imgSelector.state !== "hasValue")
      return { totalPages: 0, pageGroups: [] };

    const totalPages = imgSelector.contents.total_pages || 0;
    const pageGroups = [];
    for (let i = 0; i < totalPages; i += 10) {
      pageGroups.push(
        Array.from(
          { length: Math.min(10, totalPages - i) },
          (_, index) => i + index + 1
        )
      );
    }
    return { totalPages, pageGroups };
  }, [imgSelector]);

  useEffect(() => {
    if (paginationData.totalPages > 0) {
      setCurrentGroup(Math.floor((page - 1) / 10));
    }
  }, [page, paginationData.totalPages]);

  const moveToPage = (selected: number) => {
    setPage(selected);
    setCurrentGroup(Math.floor((selected - 1) / 10));
  };

  const moveToPrev = () => {
    if (currentGroup > 0) {
      setCurrentGroup((prev) => prev - 1);
      setPage(paginationData.pageGroups[currentGroup - 1][0]);
    }
  };

  const moveToNext = () => {
    if (currentGroup < paginationData.pageGroups.length - 1) {
      setCurrentGroup((prev) => prev + 1);
      setPage(paginationData.pageGroups[currentGroup + 1][0]);
    }
  };

  if (paginationData.totalPages === 0) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button
          className={styles.pagination__button}
          onClick={moveToPrev}
          disabled={currentGroup === 0}
        >
          <img src="src/assets/icons/icon-arrowLeft.svg" alt="왼쪽화살표" />
        </button>

        {paginationData.pageGroups[currentGroup]?.map((item: number) => (
          <button
            className={`${styles.pagination__button} ${
              page === item ? styles.active : styles.inactive
            }`}
            key={item}
            onClick={() => moveToPage(item)}
          >
            {item}
          </button>
        ))}

        <button
          className={styles.pagination__button}
          onClick={moveToNext}
          disabled={currentGroup === paginationData.pageGroups.length - 1}
        >
          <img src="src/assets/icons/icon-arrowRight.svg" alt="오른쪽화살표" />
        </button>
      </div>
    </footer>
  );
}

export default CommonFooter;
