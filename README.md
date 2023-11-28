## Environment

- NodeJS: v16.15.1
- Xcode: 15.0.1
- Test Simulator: iPhone 15
- yarn ios 명령으로 실행시 iPhone 15 시뮬레이터를 사용하게 설정해두었습니다.

## 과제 구현 사항

- AsyncStorage를 사용하여 checklist 의 데이터를 관리하도록 하였습니다.
- checklist 를 추가할 때, 키보드 위쪽에 TextInput 이 올라오는 것을 구현하기 위해 모달 관련 컴포넌트를 `absolute`로 두고, `keyboardAvoidingView`를 사용하여 구현하였습니다.
- 주차가 바뀌는 도중에 데이터를 가져오지 않도록 신경써서 구현하였습니다.
  - 사용자가 스크롤을 움직여 관성이 생기는 경우, 애니메이션이 종료되면 데이터를 가져오도록 하였습니다.
  - 관성이 생기지 않도록 스크롤을 하는 경우에는 스크롤이 끝나면 데이터를 가져오도록 구현하였습니다.
- 전역적으로 사용해야하는 데이터의 경우 `recoil` 을 활용하여 상태를 관리해주었습니다.
- 성급한 최적화는 오히려 안좋다고 생각하여 꼭 필요한 경우에만 `useCallback`, `useMemo` 를 사용하였습니다.
