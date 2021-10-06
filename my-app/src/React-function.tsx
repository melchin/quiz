import React from "react";
/*
 1. Write a react function that takes the following input:
    rooms = [
        { room_type: "Queen", vacant_rooms: 5, price: 100 },
        { room_type: "Double", vacant_rooms: 3, price: 75 },
        { room_type: "Twin", vacant_rooms: 8, price: 60 }
    ];
And produces the following output:
    <ol>
        <li>Queen, 5, $100</li>
        <li>Double, 3, $75</li>
        <li>Twin, 8, $60</li>
    </ol>

 */
const ALL_ROOMS = [
  { room_type: "Queen", vacant_rooms: 5, price: 100 },
  { room_type: "Double", vacant_rooms: 3, price: 75 },
  { room_type: "Twin", vacant_rooms: 8, price: 60 }
];

function MyList() {
  const rooms = ALL_ROOMS.map(room => {
    const decodedRoom: string[] = Object.keys(room).map(key => {
      if (key === "price") {
        return `$${room[key]}`;
      } else {
        return `${room[key as keyof typeof room]}`;
      }
    });
    return <li key={room.room_type}>{decodedRoom.join(", ")}</li>;
  });
  return <ol>{rooms}</ol>;
}

export default MyList;
