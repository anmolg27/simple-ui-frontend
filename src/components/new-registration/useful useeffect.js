useEffect(() => {
  let selectedRooms;
  let notSelectedRooms;
  if (tableFields.length > 0 && roomsAvailable.length > 0) {
    setTableFields((flds) => {
      return flds.map((fld) => ({
        ...fld,
        roomType: {
          ...fld.roomType,
          options: roomsAvailable
            .map((room) => room.roomType)
            .reduce((a, v) => {
              !a.includes(v) && a.push(v);
              return a;
            }, []),
          handleChange: (val) => {
            setTableFields((fields) =>
              fields.map((feld) => {
                if (fld["id"] === feld["id"]) {
                  feld.roomType.value = val;
                  feld.numberOfPeople.value = "";
                  feld.numberOfPeople.options = [];
                  feld.roomNumber.options = [];
                  feld.roomNumber.value = "";
                  feld.amount.value = "";
                  selectedRooms = [];
                  tableFields.forEach(
                    (tbField) =>
                      tbField.roomNumber.value &&
                      selectedRooms.push(tbField.roomNumber.value)
                  );
                  notSelectedRooms = roomsAvailable
                    .filter((room) => !selectedRooms.includes(room.roomNumber))
                    .map((room) => room.roomNumber);
                  feld.numberOfPeople.options = roomsAvailable
                    .filter((room) =>
                      notSelectedRooms.includes(room.roomNumber)
                    )
                    .filter((room) => room.roomType === val)
                    .map((room) => room.roomCapacity)
                    .reduce((a, v) => {
                      !a.includes(v) && a.push(v);
                      return a;
                    }, []);
                  feld.numberOfPeople.handleChange = (valu) => {
                    setTableFields((feelds) =>
                      feelds.map((feeld) => {
                        if (feld["id"] === feeld["id"]) {
                          feeld.numberOfPeople.value = valu;
                          feeld.amount.value = "";
                          feeld.roomNumber.value = "";
                          feeld.roomNumber.handleChange = (roomNumberVal) => {
                            setTableFields((feeelds) =>
                              feeelds.map((feeeld) => {
                                if (feeeld["id"] === feeld["id"]) {
                                  feeeld.roomNumber.value = roomNumberVal;

                                  feeeld.amount.value = calculateAmount(
                                    roomsAvailable.find(
                                      (room) =>
                                        room.roomNumber === roomNumberVal
                                    ).chargePerDay,
                                    feeeld.checkIn.value,
                                    feeeld.checkOut.value
                                  );
                                  feeeld.checkIn.handleChange = (
                                    checkInVal
                                  ) => {
                                    setTableFields((feeeelds) =>
                                      feeeelds.map((feeeeld) => {
                                        if (feeeeld["id"] === feeeld["id"]) {
                                          feeeeld.checkIn.value = checkInVal;
                                          feeeeld.amount.value = calculateAmount(
                                            roomsAvailable.find(
                                              (room) =>
                                                room.roomNumber ===
                                                roomNumberVal
                                            ).chargePerDay,
                                            feeeeld.checkIn.value,
                                            feeeeld.checkOut.value
                                          );
                                        }
                                        // console.log("checoutdate");
                                        // console.log(feeeeld.checkOut.value);

                                        return feeeeld;
                                      })
                                    );
                                  };
                                  feeeld.checkOut.handleChange = (
                                    checkOutVal
                                  ) => {
                                    setTableFields((feeeelds) =>
                                      feeeelds.map((feeeeld) => {
                                        if (feeeeld["id"] === feeeld["id"]) {
                                          feeeeld.checkOut.value = checkOutVal;
                                          feeeeld.amount.value = calculateAmount(
                                            roomsAvailable.find(
                                              (room) =>
                                                room.roomNumber ===
                                                roomNumberVal
                                            ).chargePerDay,
                                            feeeeld.checkIn.value,
                                            feeeeld.checkOut.value
                                          );
                                        }
                                        return feeeeld;
                                      })
                                    );
                                  };
                                }

                                setTableFields((rfields) =>
                                  rfields.map((rfield) => {
                                    selectedRooms = [];
                                    rfields.forEach(
                                      (tbField) =>
                                        tbField.roomNumber.value &&
                                        !selectedRooms.includes(
                                          tbField.roomNumber.value
                                        ) &&
                                        selectedRooms.push(
                                          tbField.roomNumber.value
                                        )
                                    );
                                    notSelectedRooms = roomsAvailable
                                      .filter(
                                        (room) =>
                                          !selectedRooms.includes(
                                            room.roomNumber
                                          )
                                      )
                                      .map((room) => room.roomNumber);

                                    if (
                                      selectedRooms.includes(
                                        rfield.roomNumber.value
                                      )
                                    ) {
                                      console.log("opt");
                                      console.log();
                                      rfield.roomNumber.options = [
                                        rfield.roomNumber.value,
                                        ...roomsAvailable
                                          .filter(
                                            (room) =>
                                              room.roomCapacity ===
                                              parseInt(
                                                rfield.numberOfPeople.value
                                              )
                                          )
                                          .map((room) => room.roomNumber)
                                          .filter((room) =>
                                            notSelectedRooms.includes(room)
                                          ),
                                      ];
                                    } else
                                      rfield.roomNumber.options = roomsAvailable
                                        .filter(
                                          (room) =>
                                            room.roomCapacity ===
                                            parseInt(
                                              rfield.numberOfPeople.value
                                            )
                                        )
                                        .map((room) => room.roomNumber)
                                        .filter((room) =>
                                          notSelectedRooms.includes(room)
                                        );

                                    return rfield;
                                  })
                                );
                                return feeeld;
                              })
                            );
                          };
                        }
                        selectedRooms = [];
                        tableFields.forEach(
                          (tbField) =>
                            tbField.roomNumber.value &&
                            selectedRooms.push(tbField.roomNumber.value)
                        );
                        notSelectedRooms = roomsAvailable
                          .filter(
                            (room) =>
                              room.roomCapacity ===
                                parseInt(feeld.numberOfPeople.value) &&
                              !selectedRooms.includes(room.roomNumber)
                          )
                          .map((room) => room.roomNumber);
                        if (selectedRooms.includes(feeld.roomNumber.value)) {
                          feeld.roomNumber.options = [
                            feeld.roomNumber.value,
                            ...notSelectedRooms,
                          ];
                        } else feeld.roomNumber.options = notSelectedRooms;

                        return feeld;
                      })
                    );
                  };
                }

                return feld;
              })
            );
          },
        },
      }));
    });
  }
}, [tableFields.length, roomsAvailable.length]);
