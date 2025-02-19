# Unsplash Image API를 활용한 이미지 검색 사이트 만들기



![Screenshot 2025-02-19 at 11 33 52](https://github.com/user-attachments/assets/cb8386a1-f05c-4463-a56e-b5f4b924ff43)

**프로젝트 개요**

이 프로젝트는 Unsplash API를 활용하여 사용자 친화적이고 기능적인 이미지 검색 사이트를 구현하는 것을 목표로 합니다. React의 컴포넌트 기반 구조와 Recoil의 상태 관리 기능을 결합하여 효율적이고 확장 가능한 애플리케이션을 만들 수 있을 것입니다. SCSS를 통해 스타일 코드의 재사용성을 높이고, Unsplash API를 활용하여 고품질 이미지와 풍부한 메타데이터를 제공할 수 있을 것입니다. 이미지 검색, 필터링, 상세 정보 표시, 그리고 북마크기능을 통해 사용자들에게 다양한 상호작용 기회를 제공할 수 있습니다.

---
개발환경

1. 프로젝트 환경설정(vite를 활용한 React 설치): npm install vite@latest
2. React 중앙집중식 상태관리 라이브러리 Recoil 설치: npm install recoil
3. 외부 오픈 API 통신을 위한 라이브러리 Axios 설치: npm install axios
4. CSS 스타일링을 위한 SASS/SCSS 설치: npm install -D sass
5. React Router 설치: npm install react-router-dom localforage match-sorter sort-by
6. TypeScript에서 Node.js 모듈을 쓸 수 있는 환경 구축 : npm i @types/node
7. React Toast Popup 모듈 설치 : npm install react-simple-toasts

<aside>
🔑**주요 기능**

</aside>

1. 이미지 검색
    - 키워드 기반 이미지 검색
    - 검색 결과 그리드 형태로 표시
2. 필터 기능
    - 색상, 방향, 정렬 기준 등 다양한 필터 옵션 제공
    - 필터 적용에 따른 실시간 결과 업데이트
3. 이미지 상세 정보
    - 이미지 클릭 시 상세 정보 표시
    - 이미지 크기, 다운로드 링크 등 메타데이터 제공
4. 북마크 기능
    - 사용자가 이미지에 좋아요 표시 가능
    - 북마크 상태 로컬 스토리지 저장 및 모아보기

![Screenshot 2025-02-19 at 11 34 39](https://github.com/user-attachments/assets/af3d7361-c147-4a87-968b-9f5d78c18e09)

![Screenshot 2025-02-19 at 11 35 41](https://github.com/user-attachments/assets/b63aa2d6-3142-4e30-bba6-736a735d0748)


**React Hooks** 

1. **`useState`**:
    - 상태를 컴포넌트에 추가하는 데 사용됩니다.
    - 예: **`const [open, setOpen] = useState<boolean>(false);`**
2. **`useEffect`**:
    - 컴포넌트가 렌더링된 후 어떤 작업을 수행해야 할 때 사용됩니다.
    - 주로 데이터 페칭, 구독 설정, 수동적인 DOM 조작 등에 사용됩니다.
    - 예: **`useEffect(() => { getData(); }, []);`**
3. **`useMemo`**:
    - 계산 비용이 큰 연산의 결과를 메모이제이션하는 데 사용됩니다.
    - 의존성 배열의 값이 변경될 때만 재계산합니다.
    - 예: **`const CARD_LIST = useMemo(() => { ... }, [imgSelector]);`**
4. **`useNavigate`** :
    - 프로그래밍 방식으로 다른 페이지로 이동할 때 사용됩니다. (react-router-dom)
    - 예: **`const navigate = useNavigate();`**
5. **`useLocation`**:
    - 현재 URL의 정보를 얻는 데 사용됩니다.
    - 예: **`const location = useLocation();`**
6. **`useRecoilState, useRecoilValue, useRecoilValueLoadable`**:
    - Recoil 상태 관리 라이브러리의 훅들입니다.
    - **`useRecoilState`**: 읽기와 쓰기가 가능한 상태를 사용할 때 사용됩니다.
    - **`useRecoilValue`**: 읽기 전용 상태를 사용할 때 사용됩니다.
    - **`useRecoilValueLoadable`**: 비동기 상태를 다룰 때 사용됩니다.
    
    이 훅들은 컴포넌트의 상태 관리, 부수 효과 처리, 성능 최적화, 라우팅, 그리고 전역 상태 관리 등 다양한 목적으로 사용되고 있습니다.
