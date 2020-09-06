// class SyntheticEvent {
//   /**
//    * bubbles, currentTarget, defaultPrevented, eventPhase, nativeEvent, preventDefault(), isDefaultPrevented()
//    * stopPropagation(), isPropagationStopped(), target, timeStamp, type 와 같은 native event 기본 객체
//    */

//   isTrusted: boolean;
//   cancelable: boolean;
//   persist: () => void;

//   /**
//    * 01. SyntheticEvent에 대한 상태에 대한 가정 개념
//    *  - POOLED : 풀링되어 있는 상태
//    *  - PERSISTED : event.persist() 를 통해 이벤트 풀링에서 해제된 상태
//    *  - IN_USE : 사용중인 이벤트 이벤트 핸들러에서
//    **/
//   status: "POOLED" | "PERSISTED" | "IN_USE";

//   constructor(status, onPersist: () => void) {
//     this.status = status;
//     this.persist = onPersist;
//   }
// }

// class EventPool {
//   private pool: SyntheticEvent[] = [];
//   constructor(initialPoolSize: number) {
//     Array(initialPoolSize)
//       .fill(true)
//       .forEach(() => {
//         this.allocateNewEvent();
//       });
//   }

//   /**
//    * nativeEvent를 받아서 POOLED되어 있는 SyntheticEvent에
//    * 복사한 후 반환한다.
//    */
//   public pullEvent(nativeEvent: any): SyntheticEvent {
//     const syntheticEvent = this.getEventFromPool();
//     /**
//      * 이 부분에서 populate(채우다) 된다는 것은
//      * nativeEvent의 속성을 syntheticEvent로 복사한다는 것을 의미한다.
//      */
//     this.populateEvent(syntheticEvent, nativeEvent);
//     return syntheticEvent;
//   }

//   /**
//    * 만약, PERSISTED된 이벤트면 이벤트를 그대로 가지도록 하고,
//    * PERSISTED되지 않았다면, Synthetic Event를 초기화 하고 POOLED상태로 반환한다.
//    */
//   public tryPushEvent(syntheticEvent: SyntheticEvent): void {
//     if (syntheticEvent.status !== "PERSISTED") this.clearEvent(syntheticEvent);
//   }

//   /**
//    * POOLED된 Synthetic Event를 생성(할당)한다.
//    * POOLED의 의미는 이벤트를 받을 준비가 되어있음(대기중)을 뜻한다.
//    */
//   private allocateNewEvent(): SyntheticEvent {
//     const newEvent = new SyntheticEvent("POOLED", () => {
//       newEvent.status = "PERSISTED";
//     });
//     this.pool.push(newEvent);
//     return newEvent;
//   }

//   /**
//    * 이벤트 풀에서 POOLED된 SyntheticEvent를 찾아 반환한다.
//    * 즉, 네이티브 이벤트를 담을 Synthetic Event를 반환한다.
//    */
//   private getEventFromPool() {
//     let event = this.pool.find((e) => e.status === "POOLED");
//     if (!event) event = this.allocateNewEvent();
//     return event;
//   }

//   /**
//    * syntheticEvent에 nativeEvent를 채우는 메소드
//    * 해당 부분에서 값을 복사한다.
//    */
//   private populateEvent(syntheticEvent: SyntheticEvent, nativeEvent) {
//     syntheticEvent.status = "IN_USE";
//     syntheticEvent.isTrusted = nativeEvent.isTrusted;
//     syntheticEvent.cancelable = nativeEvent.isTrusted;
//     ...
//   }

//   /**
//    * syntheticEvent에 채워진 nativeEvent를 제거하는 메소드
//    * 해당 부분에서 복사된 값을 null로 변경해준다.
//    */
//   private clearEvent(syntheticEvent: SyntheticEvent) {
//     syntheticEvent.status = "POOLED";
//     syntheticEvent.isTrusted = null;
//     syntheticEvent.cancelable = null;
//     ...
//   }
// }
