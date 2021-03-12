import {
  LOADING_ROOM,
  ERROR_ROOM,
  STOP_LOADING_ROOM,
  SET_ROOM,
  CREATE_ROOM,
  RESERVE_ROOM,
  CLEAR_DATA,
  UNRESERVE_ROOM,
  RESERVE_AND_OCCUPY_ROOM,
  REMOVE_RESERVATION,
  EDIT_CUSTOMER_RESERVATION_ROOM,
  EDIT_RESERVATION_ROOM,
  DELETE_RESERVATION,
  EDIT_CHECKIN_ROOM,
} from "../actionTypes";
let roomsData;
const initialState = {
  loading: false,
  rooms: [],
  error: "",
};
let searchedIndex;
let foundReservationIndex;
export default function roomsReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ROOM:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CLEAR_DATA:
      return initialState;
    case SET_ROOM:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
        error: "",
      };
    case EDIT_CUSTOMER_RESERVATION_ROOM:
      const { prevData, newData } = action.payload;
      let tRooms = state.rooms;
      prevData.reservations.forEach((res) => {
        let searchedRoomIndex = tRooms.findIndex(
          (room) => parseInt(room.roomNumber) === parseInt(res.roomNumber)
        );
        tRooms[searchedRoomIndex].reservations = tRooms[
          searchedRoomIndex
        ].reservations.map((reser) => {
          if (
            reser.reservedFrom === res.checkIn &&
            reser.reservedTo === res.checkOut &&
            parseInt(prevData.mobileNumber) ===
              parseInt(parseInt(reser.mobileNumber))
          ) {
            reser.customerName = newData.customerName;
            reser.mobileNumber = newData.mobileNumber;
          }
          return reser;
        });
      });
      return {
        ...state,
        rooms: tRooms,
      };
    case EDIT_CHECKIN_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (
            action.payload.prevData.rooms.includes(parseInt(room.roomNumber))
          ) {
            room.occupiedBy.customerName = action.payload.newData.customerName;
            room.occupiedBy.mobileNumber = action.payload.newData.mobileNumber;
          }

          return room;
        }),
      };
    case EDIT_RESERVATION_ROOM:
      const {
        previousReservation,
        checkIn,
        checkOut,
        roomNumber: nRoomNumber,
        mobileNumber: nMobileNumber,
        customerName,
      } = action.payload;
      // let customerName;
      console.log("pre");
      console.log(previousReservation);
      let tempRooms = state.rooms;
      tempRooms = tempRooms.map((room) => {
        if (
          parseInt(room.roomNumber) === parseInt(previousReservation.roomNumber)
        ) {
          room.reservations = room.reservations.filter((reservation) => {
            if (
              reservation.reservedFrom === previousReservation.checkIn &&
              reservation.reservedTo === previousReservation.checkOut
            ) {
              console.log("false");
              return false;
            }
            console.log("true");
            return true;
          });
          console.log("rr");
          console.log(room);
        }
        if (parseInt(nRoomNumber) === parseInt(room.roomNumber)) {
          console.log("customer name is");
          console.log(customerName);
          room.reservations.push({
            reservedFrom: checkIn,
            reservedTo: checkOut,
            customerName: customerName,
            mobileNumber: nMobileNumber,
          });
        }

        return room;
      });
      console.log("temp");
      console.log(tempRooms);
      return {
        ...state,
        rooms: tempRooms,
      };
    case DELETE_RESERVATION:
      const { reservationData } = action.payload;
      // let customerName;
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (
            parseInt(room.roomNumber) === parseInt(reservationData.roomNumber)
          ) {
            room.reservations = room.reservations.filter((reservation) => {
              if (
                reservation.reservedFrom === reservationData.checkIn &&
                reservation.reservedTo === reservationData.checkOut
              ) {
                // customerName = reservation.customerName;
                return false;
              }
              return true;
            });
          }

          return room;
        }),
      };
    //   case UPDATE_LEDGER:
    //     let searchedInventoryIndex = state.inventories.findIndex(
    //       (iv) => iv.id === action.payload.id
    //     );
    //     if (action.payload.message === "updated successfully") {
    //       // return state.map()
    //       return {
    //         ...state,
    //         loading: false,
    //         inventories: state.inventories.map((iv, i) => {
    //           if (i === searchedInventoryIndex) {
    //             iv = action.payload;
    //           }
    //           return iv;
    //         }),
    //         error: "",
    //       };
    //     } else {
    //       return {
    //         ...state,
    //         loading: false,
    //         error: "couldnt update inventory in database",
    //         inventories: state.inventories.map((iv, i) => {
    //           if (i === searchedInventoryIndex) {
    //             iv = { ...iv, ...action.payload };
    //           }
    //           return iv;
    //         }),
    //       };
    //     }
    case CREATE_ROOM:
      searchedIndex = state.rooms.findIndex(
        (room) => room.roomNumber === action.payload.roomNumber
      );
      return {
        ...state,
        loading: false,
        error: "",
        rooms:
          searchedIndex === -1
            ? [...state.rooms, action.payload]
            : state.rooms.map((room, i) => {
                if (i === searchedIndex) room = action.payload;
                return room;
              }),
      };
    case RESERVE_ROOM:
      // roomsData = JSON.parse(localStorage.getItem("rooms")) || [];
      // searchedIndex = roomsData.findIndex(
      //   (room) =>
      //     parseInt(room.roomNumber) === parseInt(action.payload.room.roomNumber)
      // );
      // roomsData[searchedIndex].isReserved = true;

      // roomsData[searchedIndex]["reservations"].push({
      //   customerName: action.payload.customerName,
      //   mobileNumber: action.payload.mobileNumber,
      //   reservedFrom: action.payload.room.checkIn,
      //   reservedTo: action.payload.room.checkOut,
      // });
      // roomsData[searchedIndex]["reservedFrom"] = action.payload.checkIn;
      // roomsData[searchedIndex]["reservedTo"] = action.payload.checkOut;
      // localStorage.setItem("rooms", JSON.stringify(roomsData));
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (
            parseInt(room.roomNumber) ===
            parseInt(action.payload.room.roomNumber)
          ) {
            room["reservations"].push({
              customerName: action.payload.customerName,
              mobileNumber: action.payload.mobileNumber,
              reservedFrom: action.payload.room.checkIn,
              reservedTo: action.payload.room.checkOut,
            });
            // room["reservedFrom"] = action.payload.room.checkIn;
            // room["reservedTo"] = action.payload.room.checkOut;
            room.isReserved = true;
          }
          return room;
        }),
      };
    case RESERVE_AND_OCCUPY_ROOM:
      // roomsData = JSON.parse(localStorage.getItem("rooms")) || [];
      console.log("room Number is");
      console.log(action.payload);
      console.log("rromsData");
      console.log(roomsData);
      let pRoomNumber = action.payload.roomNumber;
      // searchedIndex = roomsData.findIndex(
      //   (room) =>
      //     parseFloat(room.roomNumber) === parseFloat(action.payload.roomNumber)
      // );
      console.log("resss searched room index is");
      console.log(searchedIndex);
      // roomsData[searchedIndex].isReserved = true;
      // roomsData[searchedIndex].isOccupied = true;
      let tempData = action.payload;
      delete tempData.roomNumber;
      console.log("tempdata");
      console.log(tempData);
      // if (!roomsData[searchedIndex].occupiedBy)
      // roomsData[searchedIndex].occupiedBy = {};
      // roomsData[searchedIndex].occupiedBy = tempData;
      localStorage.setItem("rooms", JSON.stringify(roomsData));
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          console.log("yoyo");
          if (parseFloat(room.roomNumber) === parseFloat(pRoomNumber)) {
            console.log("room is");
            console.log(room);
            room.isReserved = true;
            room.isOccupied = true;
            // if (!room.occupiedBy) room.occupiedBy = [];
            room.occupiedBy = tempData;
          }
          return room;
        }),
      };
    case REMOVE_RESERVATION:
      const {
        roomNumber,
        mobileNumber,
        reservedFrom,
        reservedTo,
      } = action.payload;
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (room.roomNumber === roomNumber) {
            room.reservations = room.reservations.filter((rReservation) => {
              if (
                rReservation.reservedFrom === reservedFrom &&
                rReservation.reservedTo === reservedTo &&
                rReservation.mobileNumber === mobileNumber
              )
                return false;
              else return true;
            });
          }
          return room;
        }),
      };
    case UNRESERVE_ROOM:
      // roomsData = JSON.parse(localStorage.getItem("rooms")) || [];
      console.log("action is");
      console.log(action.payload);
      // searchedIndex = roomsData.findIndex(
      //   (room) => room.roomNumber === action.payload
      // );
      // roomsData[searchedIndex].isReserved = false;
      // localStorage.setItem("rooms", JSON.stringify(roomsData));
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (parseInt(room.roomNumber) === parseInt(action.payload)) {
            room.isOccupied = false;
            room.isReserved = false;
          }
          return room;
        }),
      };

    case ERROR_ROOM:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STOP_LOADING_ROOM:
      return {
        ...state,
        error: "",
        loading: false,
      };
    default:
      return state;
  }
}
