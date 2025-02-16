import { CardDTO, Tag } from "@/pages/index/types/card";
import { useEffect, useState } from "react";
import toast, { toastConfig } from "react-simple-toasts";
import styles from "./DetailDialog.module.scss";
import "react-simple-toasts/dist/theme/dark.css";

toastConfig({ theme: "dark" });

interface Props {
  data: CardDTO;
  handleDialog: (eventValue: boolean) => void;
}

function DetailDialog({ data, handleDialog }: Props) {
  // data가 준비되지 않았을 경우를 대비한 조건부 렌더링
  if (!data || !data.user) {
    return <div>데이터가 준비되지 않았습니다.</div>;
  }

  const [bookmark, setBookmark] = useState(false);

  // 다이얼로그 끄기
  const closeDialog = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleDialog(false);
    event.stopPropagation();
  };

  // 북마크 추가 이벤트
  const addBookmark = (selected: CardDTO) => {
    setBookmark(true);

    const storedBookmarks = JSON.parse(localStorage.getItem("bookmark"));
    // 1. 로컬 스토리지에 bookmark 데이터가 없을 경우
    if (!storedBookmarks || storedBookmarks === null) {
      localStorage.setItem("bookmark", JSON.stringify([selected]));
      toast("해당 이미지를 북마크에 저장 하였습니다. ☺️");
    } else {
      // 2. 해당 이미지가 이미 북마크에 저장되어 있을 경우
      if (
        storedBookmarks.findIndex((item: CardDTO) => item.id === selected.id) >
        -1
      ) {
        toast("해당 이미지는 이미 북마크에 추가된 상태입니다. 🙄");
      } else {
        // 3. 북마크 데이터가 있지만, 해당 이미지가 없을 경우
        const updatedBookmarks = [...storedBookmarks, selected];
        localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
        toast("해당 이미지를 북마크에 저장 하였습니다. ☺️");
      }
    }
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmark"));

    if (
      storedBookmarks &&
      storedBookmarks.findIndex((item: CardDTO) => item.id === data.id) > -1
    ) {
      setBookmark(true);
    }

    // ESC 키를 눌렀을 때 다이얼로그 닫기
    const escKeyDownCloseDialog = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // 여기서는 event의 타입이 KeyboardEvent이므로, 별도 캐스팅 없이 closeDialog에 맞춰서 호출합니다.
        // 만약 문제가 있다면 별도의 함수로 처리할 수 있습니다.
        closeDialog(event as any);
      }
    };

    document.addEventListener("keydown", escKeyDownCloseDialog);
    return () => document.removeEventListener("keydown", escKeyDownCloseDialog);
  }, [data]);

  return (
    <div className={styles.container} onClick={closeDialog}>
      <div className={styles.container__dialog}>
        <div className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={closeDialog}>
              {/* 구글 아이콘 사용 */}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "28px" }}
              >
                close
              </span>
            </button>
            <img
              src={data.user.profile_image.small}
              alt="사진작가 프로필 사진"
              className={styles.close__authorImage}
            />
            <span className={styles.close__authorName}>{data.user.name}</span>
          </div>
          <div className={styles.bookmark}>
            <button
              className={styles.bookmark__button}
              onClick={() => addBookmark(data)}
            >
              {/* 구글 아이콘 사용 */}
              {bookmark ? (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px", color: "red" }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  favorite
                </span>
              )}
              북마크
            </button>
            <button className={styles.bookmark__button}>다운로드</button>
          </div>
        </div>
        <div className={styles.container__dialog__body}>
          <img
            src={data.urls.small}
            alt="상세이미지"
            className={styles.image}
          />
        </div>
        <div className={styles.container__dialog__footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>이미지 크기</span>
              <span className={styles.infoBox__item__value}>
                {data.width} X {data.height}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>업로드</span>
              <span className={styles.infoBox__item__value}>
                {data.created_at.split("T")[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>
                마지막 업데이트
              </span>
              <span className={styles.infoBox__item__value}>
                {data.updated_at.split("T")[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>다운로드</span>
              <span className={styles.infoBox__item__value}>{data.likes}</span>
            </div>
          </div>
          <div className={styles.tagBox}>
            {(data.tags || []).map((tag: Tag) => (
              <div className={styles.tagBox__tag} key={tag.title}>
                {tag.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailDialog;
