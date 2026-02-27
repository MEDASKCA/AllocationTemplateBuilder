"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";

export default function Home() {
  const [hospitalName, setHospitalName] = useState("");
  const [allocationDate, setAllocationDate] = useState("");
  const [unitCount, setUnitCount] = useState(2);
  const [unitNames, setUnitNames] = useState(["Hosp Day Unit 1", "Hosp Day Unit 2"]);
  const [unitsPerUnit, setUnitsPerUnit] = useState([8, 8]);
  const [subunitLabel, setSubunitLabel] = useState("Room");
  const [subunitsPerUnit, setSubunitsPerUnit] = useState(8);
  const [satelliteUnits, setSatelliteUnits] = useState("Satellite Day Unit");
  const [leadRoleLabel, setLeadRoleLabel] = useState("");
  const [contactPreference, setContactPreference] = useState("label");
  const [contactValue, setContactValue] = useState("");
  const [leadBoth, setLeadBoth] = useState("");
  const [coordinatorsPerUnit, setCoordinatorsPerUnit] = useState([2, 1]);
  const [coordinatorLabels, setCoordinatorLabels] = useState(["", "", "", ""]);
  const [hasNightUnit, setHasNightUnit] = useState(false);
  const [hasSatelliteUnit, setHasSatelliteUnit] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [showPlaceholders, setShowPlaceholders] = useState(true);
  const isSingleUnit = unitCount === 1;

  const unitNamesArr = useMemo(() => {
    const base = Array.from({ length: unitCount }, (_, i) => unitNames[i] || `Unit ${i + 1}`);
    return base;
  }, [unitCount, unitNames]);
  const unit1 = unitNamesArr[0] || "Unit 1";
  const unit2 = unitNamesArr[1] || "Unit 2";
  const satelliteLabel = satelliteUnits || "Satellite Day Unit";

  const roomLabel = (_unitLabel: string, roomNum: number) =>
    `${subunitLabel || "Room"} ${roomNum}`;

  const leftRoomLabel = (roomNum: number) => {
    if (unitCount === 1) return roomLabel(unit1, roomNum);
    return roomLabel(unit1, roomNum);
  };

  const rightRoomLabel = (roomNum: number) => {
    if (unitCount === 1) return "";
    return roomLabel(unit2, roomNum);
  };

  const leadLabelPreview = useMemo(() => {
    if (contactPreference === "label") return leadRoleLabel || "Coordinator";
    if (contactPreference === "contact") return contactValue || "Extension/Bleep";
    return leadBoth || "Coordinator + Extension/Bleep";
  }, [contactPreference, leadRoleLabel, contactValue, leadBoth]);

  const coordinatorPlaceholder = "(Title): (FIRST INITIAL) (SURNAME) (SHIFT PATTERN)";
  const coordinatorText = (index: number) => {
    const custom = coordinatorLabels[index - 1];
    return custom?.trim() ? custom : `${leadLabelPreview} ${index}`;
  };
  const managementCount = 1;
  const floaterCount = 1;
  const unallocatedCount = 1;

  const getEContent = (row: number) => {
    const managementLabelRow = 5;
    const managementSlotsStart = managementLabelRow + 2;
    const floaterLabelRow = managementSlotsStart + managementCount;
    const floaterSlotsStart = floaterLabelRow + 2;
    const unallocatedLabelRow = floaterSlotsStart + floaterCount;
    const unallocatedSlotsStart = unallocatedLabelRow + 2;

    if (row === managementLabelRow) return "MANAGEMENT";
    if (row >= managementSlotsStart && row < managementSlotsStart + managementCount) {
      return `M${row - managementSlotsStart + 1}`;
    }
    if (row === floaterLabelRow) return "FLOATER(S)";
    if (row >= floaterSlotsStart && row < floaterSlotsStart + floaterCount) {
      return `F${row - floaterSlotsStart + 1}`;
    }
    if (row === unallocatedLabelRow) return "UNALLOCATED";
    if (row >= unallocatedSlotsStart && row < unallocatedSlotsStart + unallocatedCount) {
      return `U${row - unallocatedSlotsStart + 1}`;
    }
    return "";
  };

  const eCell = (row: number) => (
    <>
      {cellRef("E", row)}
      {getEContent(row)}
    </>
  );

  const getEType = (row: number) => {
    const managementLabelRow = 5;
    const managementSlotsStart = managementLabelRow + 2;
    const floaterLabelRow = managementSlotsStart + managementCount;
    const floaterSlotsStart = floaterLabelRow + 2;
    const unallocatedLabelRow = floaterSlotsStart + floaterCount;
    const unallocatedSlotsStart = unallocatedLabelRow + 2;
    const isLabel =
      row === managementLabelRow || row === floaterLabelRow || row === unallocatedLabelRow;
    const isSlot =
      (row >= managementSlotsStart && row < managementSlotsStart + managementCount) ||
      (row >= floaterSlotsStart && row < floaterSlotsStart + floaterCount) ||
      (row >= unallocatedSlotsStart && row < unallocatedSlotsStart + unallocatedCount);
    if (isLabel) return "label";
    if (isSlot) return "slot";
    return "empty";
  };

  const unit1Rooms = unitsPerUnit[0] || subunitsPerUnit || 8;
  const unit2Rooms = unitCount > 1 ? unitsPerUnit[1] || subunitsPerUnit || 8 : 0;
  const unit1Coordinators = coordinatorsPerUnit[0] || 1;
  const unit2Coordinators = unitCount > 1 ? coordinatorsPerUnit[1] || 1 : 0;
  const maxRooms = unitCount > 1 ? Math.max(unit1Rooms, unit2Rooms) : unit1Rooms;
  const cellRef = (col: string, row: number) =>
    showPlaceholders ? <span className="cell-ref">{`${col}${row}`}</span> : null;
  const eCellProps = (row: number) => {
    const eType = getEType(row);
    const noBorders =
      eType !== "label" ? " no-border-top no-border-bottom no-border-right" : "";
    const className = `col-e-cell e-${eType}${noBorders}`;
    const style =
      eType !== "label"
        ? {
            borderTop: "none",
            borderBottom: "none",
            borderRight: "none",
          }
        : undefined;
    return { className, style };
  };
  const slotText = (unit: number, roomNum: number, slotNumber: number) =>
    showPlaceholders ? `${unit}.${roomNum}.${slotNumber}${slotNumber === 1 ? "*" : ""}` : "";
  const staffPlaceholder = "(Title): (FIRST INITIAL) (SURNAME)  (SHIFT PATTERN)";
  const slotTextStyle = { fontSize: "20px" };
  const rightSections: Array<{ label: string; rows: number; prefix: string }> = [];
  if (unitCount > 1 && hasNightUnit) {
    rightSections.push({ label: "Hosp Night Unit", rows: 15, prefix: "2.9." });
  }
  if (unitCount > 1 && hasSatelliteUnit) {
    rightSections.push({ label: satelliteLabel, rows: 6, prefix: "S.1." });
  }
  let rightSectionIndex = 0;
  let rightSectionRow = 0;
  const currentRightSection = () => rightSections[rightSectionIndex] ?? null;
  const remainingRightRows = () => {
    const section = currentRightSection();
    if (!section) return 0;
    let total = section.rows - rightSectionRow;
    for (let i = rightSectionIndex + 1; i < rightSections.length; i += 1) {
      total += rightSections[i].rows;
    }
    return total;
  };
  const appendRightExtraCells = (cells: ReactElement[]) => {
    const section = currentRightSection();
    if (!section) {
      cells.push(<td key="c" className="unit-empty"></td>);
      cells.push(<td key="d" className="unit-empty"></td>);
      return false;
    }

    const isFirstRow = rightSectionRow === 0;
    if (isFirstRow) {
      const remainingRows = section.rows;
      cells.push(
        <td key="c" rowSpan={remainingRows} className="block-label">
          {cellRef("C", row)}
          {section.label}
        </td>
      );
    }

    const slotIndex = rightSectionRow + 1;
    cells.push(
      <td key="d" className="slot-cell slot-cell-dual" style={slotTextStyle}>
        {cellRef("D", row)}
        <span className="slot-placeholder" style={{ fontWeight: 400 }}>
          {showPlaceholders ? `${section.prefix}${slotIndex}${slotIndex === 1 ? "*" : ""}` : ""}
        </span>
        <span className="slot-name">{staffPlaceholder}</span>
      </td>
    );

    rightSectionRow += 1;
    if (rightSectionRow >= section.rows) {
      rightSectionIndex += 1;
      rightSectionRow = 0;
    }
    return true;
  };
  const rows = [];
  let row = 1;

  const pushRow = (cells: ReactElement[]) => {
    rows.push(
      <tr key={`r-${row}`}>
        {cells}
      </tr>
    );
    row += 1;
  };

  // Header rows
  pushRow([
    unit1Coordinators === 1 ? (
      <td key="a" rowSpan={2} className="header-cell">
        {cellRef("A", row)}
        {coordinatorText(1)}
      </td>
    ) : (
      <td key="a" className="header-cell">
        {cellRef("A", row)}
        {coordinatorText(1)}
      </td>
    ),
    <td key="b">
      {cellRef("B", row)}
      <span className="coordinator-placeholder">{coordinatorPlaceholder}</span>
    </td>,
    unitCount > 1 ? (
      unit2Coordinators === 1 ? (
        <td key="c" rowSpan={2} className="header-cell">
          {cellRef("C", row)}
          {coordinatorText(3)}
        </td>
      ) : (
        <td key="c" className="header-cell">
          {cellRef("C", row)}
          {coordinatorText(3)}
        </td>
      )
    ) : null,
    unitCount > 1 ? (
      unit2Coordinators === 1 ? (
        <td key="d" rowSpan={2}>
          {cellRef("D", row)}
          <span className="coordinator-placeholder">{coordinatorPlaceholder}</span>
        </td>
      ) : (
        <td key="d">
          {cellRef("D", row)}
          <span className="coordinator-placeholder">{coordinatorPlaceholder}</span>
        </td>
      )
    ) : null,
    <td key="e" className={eCellProps(row).className} style={eCellProps(row).style}>{eCell(row)}</td>,
  ].filter(Boolean));

  pushRow([
    unit1Coordinators > 1 ? (
      <td key="a" className="header-cell">
        {cellRef("A", row)}
        {coordinatorText(2)}
      </td>
    ) : null,
    <td key="b">
      {cellRef("B", row)}
      <span className="coordinator-placeholder">{coordinatorPlaceholder}</span>
    </td>,
    unitCount > 1 && unit2Coordinators > 1 ? (
      <td key="c" className="header-cell">
        {cellRef("C", row)}
        {coordinatorText(4)}
      </td>
    ) : null,
    unitCount > 1 && unit2Coordinators > 1 ? (
      <td key="d">
        {cellRef("D", row)}
        <span className="coordinator-placeholder">{coordinatorPlaceholder}</span>
      </td>
    ) : null,
    <td key="e" className={eCellProps(row).className} style={eCellProps(row).style}>{eCell(row)}</td>,
  ].filter(Boolean));

  // Unit headers
  pushRow([
    <td key="a" rowSpan={2} className="section-cell">{cellRef("A", row)}{unit1}</td>,
    <td key="b" rowSpan={2}>{cellRef("B", row)}</td>,
    unitCount > 1 ? (
      <td key="c" rowSpan={2} className="section-cell">{cellRef("C", row)}{unit2}</td>
    ) : null,
    unitCount > 1 ? <td key="d" rowSpan={2}>{cellRef("D", row)}</td> : null,
    <td key="e" className={eCellProps(row).className} style={eCellProps(row).style}>{eCell(row)}</td>,
  ].filter(Boolean));

  // Spacer row to align E-column labels with legacy numbering
  pushRow([
    <td key="a" className="unit-empty"></td>,
    <td key="b" className="unit-empty"></td>,
    unitCount > 1 ? <td key="c" className="unit-empty"></td> : null,
    unitCount > 1 ? <td key="d" className="unit-empty"></td> : null,
    <td key="e" className={eCellProps(row).className} style={eCellProps(row).style}>{eCell(row)}</td>,
  ].filter(Boolean));

  // Room blocks
  for (let roomNum = 1; roomNum <= maxRooms; roomNum += 1) {
    for (let offset = 0; offset < 6; offset += 1) {
      const inRoomSection = offset < 3;
      const slotNumber = offset + 1;
      const unit1HasRoom = roomNum <= unit1Rooms;
      const unit2HasRoom = roomNum <= unit2Rooms;

      const cells = [];

      if (inRoomSection && offset === 0) {
        cells.push(
          unit1HasRoom ? (
            <td key="a" rowSpan={3} className="block-label room-label">{cellRef("A", row)}{leftRoomLabel(roomNum)}</td>
          ) : (
            <td key="a" className="unit-empty"></td>
          )
        );
      } else if (!inRoomSection && offset === 3) {
        cells.push(
          unit1HasRoom ? (
            <td key="a" rowSpan={3} className="block-label">{cellRef("A", row)}{`Specialty ${roomNum}`}</td>
          ) : (
            <td key="a" className="unit-empty"></td>
          )
        );
      } else {
        if (!unit1HasRoom) {
          cells.push(<td key="a" className="unit-empty"></td>);
        }
      }

      const unit1SlotClass = unit1HasRoom
        ? [offset < 5 ? "no-border-bottom" : "", offset > 0 ? "no-border-top" : ""]
            .filter(Boolean)
            .join(" ")
        : "";
      const unit1Content = staffPlaceholder;
      const unit1CellClass = `${unit1SlotClass} slot-cell slot-cell-dual`.trim();
      const unit1LeftBorderClass = !unit1HasRoom ? " no-border-left" : "";
      cells.push(
        unit1HasRoom ? (
          <td key="b" className={`${unit1CellClass}${unit1LeftBorderClass}`} style={{ ...slotTextStyle }}>
            {cellRef("B", row)}
            <span className="slot-placeholder" style={{ fontWeight: 400 }}>{slotText(1, roomNum, slotNumber)}</span>
            <span className="slot-name">{unit1Content}</span>
          </td>
        ) : (
          <td key="b" className={`unit-empty${unit1LeftBorderClass}`}></td>
        )
      );

      if (unitCount > 1) {
        let rightColumnOccupied = unit2HasRoom;
        if (inRoomSection && offset === 0) {
          if (unit2HasRoom) {
            cells.push(
              <td key="c" rowSpan={3} className="block-label room-label">{cellRef("C", row)}{rightRoomLabel(roomNum)}</td>
            );
          }
        } else if (!inRoomSection && offset === 3) {
          if (unit2HasRoom) {
            cells.push(
              <td key="c" rowSpan={3} className="block-label">{cellRef("C", row)}{`Specialty ${roomNum}`}</td>
            );
          }
        }

        if (unit2HasRoom) {
          const unit2SlotClass = [offset < 5 ? "no-border-bottom" : "", offset > 0 ? "no-border-top" : ""]
            .filter(Boolean)
            .join(" ");
          cells.push(
            <td key="d" className={`${unit2SlotClass} slot-cell slot-cell-dual`.trim()} style={slotTextStyle}>
              {cellRef("D", row)}
              <span className="slot-placeholder" style={{ fontWeight: 400 }}>{slotText(2, roomNum, slotNumber)}</span>
              <span className="slot-name">{staffPlaceholder}</span>
            </td>
          );
        } else {
          rightColumnOccupied = appendRightExtraCells(cells);
        }

        const eLeftBorderClass = unitCount > 1 && !rightColumnOccupied ? " no-border-left" : "";
        const eStyle =
          unitCount > 1 && !rightColumnOccupied
            ? { ...eCellProps(row).style, borderLeft: "none" }
            : eCellProps(row).style;
        cells.push(
          <td
            key="e"
            className={`${eCellProps(row).className}${eLeftBorderClass}`}
            style={eStyle}
          >
            {eCell(row)}
          </td>
        );
      } else {
        cells.push(
          <td
            key="e"
            className={eCellProps(row).className}
            style={eCellProps(row).style}
          >
            {eCell(row)}
          </td>
        );
      }

      pushRow(cells.filter(Boolean));
    }
  }

  let appendedRightContinuation = false;
  while (unitCount > 1 && currentRightSection()) {
    const cells = [];
    if (!appendedRightContinuation) {
      const totalRemaining = remainingRightRows();
      cells.push(<td key="a" rowSpan={totalRemaining} className="unit-empty"></td>);
      cells.push(<td key="b" rowSpan={totalRemaining} className="unit-empty"></td>);
      appendedRightContinuation = true;
    }
    appendRightExtraCells(cells);
    cells.push(
      <td key="e" className={eCellProps(row).className} style={eCellProps(row).style}>
        {eCell(row)}
      </td>
    );
    pushRow(cells);
  }
  return (
    <main className="allocation-page">
      <div className="split-layout">
        <aside className="left-panel no-print">
          <div className="left-panel-title">Allocation Template Builder</div>
          <div className="left-panel-steps">
            <button
              className={`step-pill${activeSection === 1 ? " is-active" : ""}`}
              type="button"
              onClick={() => setActiveSection(1)}
            >
              1. Hospital Details
            </button>
            <button
              className={`step-pill${activeSection === 2 ? " is-active" : ""}`}
              type="button"
              onClick={() => setActiveSection(2)}
            >
              2. Lead Roles
            </button>
            <button
              className={`step-pill${activeSection === 3 ? " is-active" : ""}`}
              type="button"
              onClick={() => setActiveSection(3)}
            >
              3. Other Services
            </button>
          </div>
          <div className="left-panel-body">
            <div className="form-grid">
              {activeSection === 1 && (
                <>
                  <div className="panel-section-title">Hospital Details</div>
                  <label className="form-label">Hospital Name</label>
                  <input
                    className="form-input"
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="e.g., Royal London Hospital"
                  />

                  <label className="form-label">Date</label>
                  <input
                    className="form-input"
                    type="date"
                    value={allocationDate}
                    onChange={(e) => setAllocationDate(e.target.value)}
                  />

                  <label className="form-label">Number of Units</label>
                  <input
                    className="form-input"
                    type="number"
                    min="1"
                    value={unitCount}
                    onChange={(e) => {
                      const next = Number(e.target.value) || 1;
                      setUnitCount(next);
                      setUnitNames((prev) => {
                        const copy = [...prev];
                        while (copy.length < next) copy.push(`Unit ${copy.length + 1}`);
                        return copy.slice(0, next);
                      });
                      setUnitsPerUnit((prev) => {
                        const copy = [...prev];
                        while (copy.length < next) copy.push(8);
                        return copy.slice(0, next);
                      });
                      setCoordinatorsPerUnit((prev) => {
                        const copy = [...prev];
                        while (copy.length < next) copy.push(1);
                        return copy.slice(0, next);
                      });
                    }}
                    placeholder="e.g., 2"
                  />

                  {Array.from({ length: unitCount }, (_, i) => (
                    <div className="form-row" key={`unit-${i}`}>
                      <label className="form-label">{`What is Unit ${i + 1} called?`}</label>
                      <input
                        className="form-input"
                        type="text"
                        value={unitNames[i] || ""}
                        onChange={(e) => {
                          const next = [...unitNames];
                          next[i] = e.target.value;
                          setUnitNames(next);
                        }}
                        placeholder={`Unit ${i + 1} name`}
                      />
                      <label className="form-label">{`Enter the number of ${subunitLabel || "rooms"} in Unit ${i + 1}`}</label>
                      <input
                        className="form-input"
                        type="number"
                        min="1"
                        value={unitsPerUnit[i] || 1}
                        onChange={(e) => {
                          const next = [...unitsPerUnit];
                          next[i] = Number(e.target.value) || 1;
                          setUnitsPerUnit(next);
                        }}
                        placeholder="e.g., 8"
                      />
                    </div>
                  ))}

                  <label className="form-label">Subunit Label</label>
                  <input
                    className="form-input"
                    type="text"
                    value={subunitLabel}
                    onChange={(e) => setSubunitLabel(e.target.value)}
                    placeholder="e.g., Room, Theatre, Bay"
                  />
                </>
              )}

              {activeSection === 2 && (
                <>
                  <div className="panel-section-title">Lead Roles</div>
                  {Array.from({ length: unitCount }, (_, i) => (
                    <div className="form-row" key={`coord-${i}`}>
                      <label className="form-label">{`Coordinators in Unit ${i + 1}`}</label>
                      <input
                        className="form-input"
                        type="number"
                        min="1"
                        max="2"
                        value={coordinatorsPerUnit[i] || 1}
                        onChange={(e) => {
                          const next = [...coordinatorsPerUnit];
                          const value = Number(e.target.value) || 1;
                          next[i] = Math.min(Math.max(value, 1), 2);
                          setCoordinatorsPerUnit(next);
                        }}
                        placeholder="1 or 2"
                      />
                    </div>
                  ))}

                  <label className="form-label">Lead roles on duty</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="leadPref"
                        value="label"
                        checked={contactPreference === "label"}
                        onChange={() => setContactPreference("label")}
                      />
                      Label only
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="leadPref"
                        value="contact"
                        checked={contactPreference === "contact"}
                        onChange={() => setContactPreference("contact")}
                      />
                      Contact only (bleep/extension)
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="leadPref"
                        value="both"
                        checked={contactPreference === "both"}
                        onChange={() => setContactPreference("both")}
                      />
                      Label + contact
                    </label>
                  </div>

                  {contactPreference === "label" && (
                    <>
                      <label className="form-label">Lead label</label>
                      <input
                        className="form-input"
                        type="text"
                        value={leadRoleLabel}
                        onChange={(e) => setLeadRoleLabel(e.target.value)}
                        placeholder='e.g., "~Unit~ Coordinator"'
                      />
                    </>
                  )}

                  {contactPreference === "contact" && (
                    <>
                      <label className="form-label">Contact label</label>
                      <input
                        className="form-input"
                        type="text"
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        placeholder="e.g., Extension 1490 / Bleep 1234"
                      />
                    </>
                  )}

                  {contactPreference === "both" && (
                    <>
                      <label className="form-label">Lead label + contact</label>
                      <input
                        className="form-input"
                        type="text"
                        value={leadBoth}
                        onChange={(e) => setLeadBoth(e.target.value)}
                        placeholder='e.g., "Theatre Coordinator ? Ext 1490"'
                      />
                    </>
                  )}

                  <label className="form-label">Coordinator Labels (optional)</label>
                  <div className="form-row">
                    <label className="form-label">Coordinator 1</label>
                    <input
                      className="form-input"
                      type="text"
                      value={coordinatorLabels[0] || ""}
                      onChange={(e) => {
                        const next = [...coordinatorLabels];
                        next[0] = e.target.value;
                        setCoordinatorLabels(next);
                      }}
                      placeholder="e.g., 1490"
                    />
                    <label className="form-label">Coordinator 2</label>
                    <input
                      className="form-input"
                      type="text"
                      value={coordinatorLabels[1] || ""}
                      onChange={(e) => {
                        const next = [...coordinatorLabels];
                        next[1] = e.target.value;
                        setCoordinatorLabels(next);
                      }}
                      placeholder="e.g., 1492"
                    />
                    <label className="form-label">Coordinator 3</label>
                    <input
                      className="form-input"
                      type="text"
                      value={coordinatorLabels[2] || ""}
                      onChange={(e) => {
                        const next = [...coordinatorLabels];
                        next[2] = e.target.value;
                        setCoordinatorLabels(next);
                      }}
                      placeholder="e.g., 1494"
                    />
                    <label className="form-label">Coordinator 4</label>
                    <input
                      className="form-input"
                      type="text"
                      value={coordinatorLabels[3] || ""}
                      onChange={(e) => {
                        const next = [...coordinatorLabels];
                        next[3] = e.target.value;
                        setCoordinatorLabels(next);
                      }}
                      placeholder="e.g., 1496"
                    />
                  </div>
                </>
              )}

              {activeSection === 3 && (
                <>
                  <div className="panel-section-title">Other Services</div>
                  <label className="form-label">Night Unit Service</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="nightUnit"
                        value="yes"
                        checked={hasNightUnit}
                        onChange={() => setHasNightUnit(true)}
                      />
                      Yes
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="nightUnit"
                        value="no"
                        checked={!hasNightUnit}
                        onChange={() => setHasNightUnit(false)}
                      />
                      No
                    </label>
                  </div>

                  <label className="form-label">Satellite Service</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="satelliteUnit"
                        value="yes"
                        checked={hasSatelliteUnit}
                        onChange={() => setHasSatelliteUnit(true)}
                      />
                      Yes
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="satelliteUnit"
                        value="no"
                        checked={!hasSatelliteUnit}
                        onChange={() => setHasSatelliteUnit(false)}
                      />
                      No
                    </label>
                  </div>

                  {hasSatelliteUnit && (
                    <>
                      <label className="form-label">Satellite Unit Label</label>
                      <input
                        className="form-input"
                        type="text"
                        value={satelliteUnits}
                        onChange={(e) => setSatelliteUnits(e.target.value)}
                        placeholder="e.g., Satellite Day Unit"
                      />
                    </>
                  )}
                </>
              )}
            </div>
            <div className="panel-footer">
              <button
                className="panel-nav-button"
                type="button"
                onClick={() => setActiveSection((s) => Math.max(1, s - 1))}
                disabled={activeSection === 1}
              >
                Back
              </button>
              <div className="panel-progress">{`Section ${activeSection} of 3`}</div>
              <button
                className="panel-nav-button primary"
                type="button"
                onClick={() => setActiveSection((s) => Math.min(3, s + 1))}
                disabled={activeSection === 3}
              >
                Next
              </button>
            </div>
          </div>
          <div className="tom-panel">
            <div className="tom-title">TOM</div>
            <div className="tom-hint">Ask TOM about mapping or setup.</div>
            <textarea className="tom-input" rows={4} placeholder="Ask TOM a question..."></textarea>
            <button className="tom-button">Send</button>
          </div>
        </aside>
        <section className="allocation-main">
          <div className="top-bar">
            <div className="title">{hospitalName || "Hospital Name"}</div>
            <div className="controls no-print"></div>
          </div>

          <div className="date-row">
            <span>{`Date: ${allocationDate || "?"}`}</span>
            <div style={{ marginLeft: "auto" }} className="no-print top-controls">
              <button
                type="button"
                className="toggle"
                aria-pressed={showPlaceholders}
                onClick={() => setShowPlaceholders((prev) => !prev)}
              >
                <span className={`toggle-track${showPlaceholders ? " is-on" : ""}`}>
                  <span className="toggle-thumb"></span>
                </span>
                <span className="toggle-label">Show placeholders</span>
              </button>
            </div>
          </div>

      <table className={`sheet${isSingleUnit ? " single-unit" : ""}${showPlaceholders ? "" : " hide-placeholders"}`}>
        <colgroup>
          <col className="col-a" />
          <col className="col-b" />
          {!isSingleUnit && <col className="col-c" />}
          {!isSingleUnit && <col className="col-d" />}
          <col className="col-e" />
        </colgroup>
        <tbody>{rows}</tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
