"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";

type SpecialtySelection = {
  specialty: string;
  subspecialty: string;
  sessionCount: string;
};

export default function Home() {
  const specialtyCatalog: Record<string, string[]> = {
    "Specialty A": ["Subspecialty A.1"],
    "Specialty B": ["Subspecialty B.1"],
    "Specialty C": ["Subspecialty C.1"],
    "Specialty D": ["Subspecialty D.1"],
  };
  const emptySpecialtySelection = (): SpecialtySelection => ({
    specialty: "",
    subspecialty: "",
    sessionCount: "",
  });
  const [departmentSiteName, setDepartmentSiteName] = useState("");
  const [allocationDate, setAllocationDate] = useState("");
  const [unitCount, setUnitCount] = useState(2);
  const [unitNames, setUnitNames] = useState(["Day Unit 1", "Day Unit 2"]);
  const [unitsPerUnit, setUnitsPerUnit] = useState([8, 8]);
  const [subunitLabelPerUnit, setSubunitLabelPerUnit] = useState(["Room", "Room"]);
  const [roomLabelMode, setRoomLabelMode] = useState<"number" | "letter">("number");
  const [roomStartPerUnit, setRoomStartPerUnit] = useState([1, 1]);
  const [specialtiesPerUnit, setSpecialtiesPerUnit] = useState<SpecialtySelection[][]>([
    Array.from({ length: 8 }, () => emptySpecialtySelection()),
    Array.from({ length: 8 }, () => emptySpecialtySelection()),
  ]);
  const [subunitsPerUnit, setSubunitsPerUnit] = useState(8);
  const [satelliteUnits, setSatelliteUnits] = useState("Satellite Day Unit");
  const [leadRoleLabel, setLeadRoleLabel] = useState("");
  const [contactPreferencePerUnit, setContactPreferencePerUnit] = useState(["label", "label"]);
  const [coordinatorsPerUnit, setCoordinatorsPerUnit] = useState([2, 1]);
  const [coordinatorLabelsPerUnit, setCoordinatorLabelsPerUnit] = useState([
    ["", ""],
    ["", ""],
  ]);
  const [leadHasContactPerUnit, setLeadHasContactPerUnit] = useState([
    [false, false],
    [false, false],
  ]);
  const [leadContactValuePerUnit, setLeadContactValuePerUnit] = useState([
    ["", ""],
    ["", ""],
  ]);
  const [roomStaffRoleEntriesPerUnit, setRoomStaffRoleEntriesPerUnit] = useState([
    [""],
    [""],
  ]);
  const [hasSecondaryRolesPerUnit, setHasSecondaryRolesPerUnit] = useState([false, false]);
  const [secondaryRoomStaffRoleEntriesPerUnit, setSecondaryRoomStaffRoleEntriesPerUnit] = useState([
    [""],
    [""],
  ]);
  const [roomStaffSlotAssignmentsPerUnit, setRoomStaffSlotAssignmentsPerUnit] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);
  const [roomStaffCountPerUnit, setRoomStaffCountPerUnit] = useState([2, 2]);
  const [roomStaffDisplayPreferencePerUnit, setRoomStaffDisplayPreferencePerUnit] = useState(["label", "label"]);
  const [roomStaffLabelsPerUnit, setRoomStaffLabelsPerUnit] = useState([
    ["", ""],
    ["", ""],
  ]);
  const [roomStaffHasContactPerUnit, setRoomStaffHasContactPerUnit] = useState([
    [false, false],
    [false, false],
  ]);
  const [roomStaffContactValuePerUnit, setRoomStaffContactValuePerUnit] = useState([
    ["", ""],
    ["", ""],
  ]);
  const [hasNightUnit, setHasNightUnit] = useState(false);
  const [hasSatelliteUnit, setHasSatelliteUnit] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [openSections, setOpenSections] = useState([1]);
  const [openRoleSubsections, setOpenRoleSubsections] = useState(["unitLead"]);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [showRoomSequencingHint, setShowRoomSequencingHint] = useState(false);
  const [showPrimaryRoomStaffHint, setShowPrimaryRoomStaffHint] = useState(false);
  const [showSecondaryRoomStaffHint, setShowSecondaryRoomStaffHint] = useState(false);
  const [roomStaffAppliesToAllUnits, setRoomStaffAppliesToAllUnits] = useState(true);
  const [auxiliaryStaffGroups, setAuxiliaryStaffGroups] = useState([""]);
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [printPaper, setPrintPaper] = useState<"A3" | "A4">("A3");
  const unitNamesArr = useMemo(() => {
    const base = Array.from({ length: unitCount }, (_, i) => unitNames[i] || `Unit ${i + 1}`);
    return base;
  }, [unitCount, unitNames]);
  const satelliteLabel = satelliteUnits || "Satellite Day Unit";
  const unitLeadTerm = leadRoleLabel.trim() || "Unit Lead";
  const unitLeadPlural = unitLeadTerm.endsWith("s") ? unitLeadTerm : `${unitLeadTerm}s`;

  const indexToLetters = (index: number) => {
    let n = Math.max(1, Math.floor(index));
    let out = "";
    while (n > 0) {
      const rem = (n - 1) % 26;
      out = String.fromCharCode(65 + rem) + out;
      n = Math.floor((n - 1) / 26);
    }
    return out;
  };

  const lettersToIndex = (value: string) => {
    const cleaned = value.trim().toUpperCase().replace(/[^A-Z]/g, "");
    if (!cleaned) return 1;
    let out = 0;
    for (let i = 0; i < cleaned.length; i += 1) {
      out = out * 26 + (cleaned.charCodeAt(i) - 64);
    }
    return Math.max(1, out);
  };

  const roomTokenForUnit = (unitIdx: number, roomNum: number) => {
    const start = roomStartPerUnit[unitIdx] || 1;
    const idx = start + roomNum - 1;
    return roomLabelMode === "letter" ? indexToLetters(idx) : String(idx);
  };

  const roomLabelTerm = (unitIdx: number) => subunitLabelPerUnit[unitIdx] || "Room";
  const roomStaffSectionLabel = useMemo(() => {
    const activeLabels = subunitLabelPerUnit
      .slice(0, unitCount)
      .map((label) => label.trim() || "Room");
    if (activeLabels.length === 0) return "Room Staff";
    const uniqueLabels = Array.from(new Set(activeLabels));
    return `${uniqueLabels.join("/")} Staff`;
  }, [subunitLabelPerUnit, unitCount]);
  const activeAuxiliaryStaffGroups = useMemo(
    () => auxiliaryStaffGroups.map((group) => group.trim()).filter(Boolean),
    [auxiliaryStaffGroups]
  );
  const auxiliaryGroupSlotPlaceholder = (groupLabel: string, index: number) => {
    const firstLetter = groupLabel.trim().charAt(0).toUpperCase();
    return `${firstLetter || String.fromCharCode(65 + index)}1`;
  };
  const roomStaffCardBaseLabel = useMemo(() => {
    const activeLabels = subunitLabelPerUnit
      .slice(0, unitCount)
      .map((label) => label.trim() || "Room");
    if (activeLabels.length === 0) return "Room";
    const uniqueLabels = Array.from(new Set(activeLabels));
    return uniqueLabels.join("/");
  }, [subunitLabelPerUnit, unitCount]);
  const roomStaffTargetsFor = (unitIdx: number) =>
    roomStaffAppliesToAllUnits ? Array.from({ length: unitCount }, (_, idx) => idx) : [unitIdx];
  const roomLabel = (unitIdx: number, _unitLabel: string, roomNum: number) =>
    `${roomLabelTerm(unitIdx)} ${roomTokenForUnit(unitIdx, roomNum)}`;
  const sessionCountLabel = (value: string) => {
    if (value === "x1") return "x 1";
    if (value === "x2") return "x 2";
    if (value === "x3") return "x 3";
    return "";
  };
  const specialtyLabelForUnitRoom = (unitIdx: number, roomNum: number) => {
    const selection = specialtiesPerUnit[unitIdx]?.[roomNum - 1];
    const baseLabel = selection?.subspecialty || selection?.specialty || "Specialty";
    const countLabel = sessionCountLabel(selection?.sessionCount || "");
    return countLabel ? `${baseLabel} ${countLabel}` : baseLabel;
  };

  const formattedDayDate = useMemo(() => {
    if (!allocationDate) return "DAY/DATE";
    const date = new Date(`${allocationDate}T00:00:00`);
    if (Number.isNaN(date.getTime())) return allocationDate.toUpperCase();
    const dayName = date.toLocaleDateString("en-GB", { weekday: "long" });
    const [year, month, day] = allocationDate.split("-");
    return `${dayName}, ${day}/${month}/${year}`.toUpperCase();
  }, [allocationDate]);

  const unitLeadSlotLabel = (unitIdx: number, index: number) =>
    `${unitLeadTerm} ${unitIdx + 1}${String.fromCharCode(64 + index)}`;
  const unitLeadBaseLabel = (unitIdx: number, index: number) => {
    const specification = coordinatorLabelsPerUnit[unitIdx]?.[index - 1]?.trim();
    return specification ? `${unitLeadTerm}-${specification}` : unitLeadSlotLabel(unitIdx, index);
  };
  const unitLeadSpecificationExample = (index: number) => {
    if (index === 1) return "e.g., Scrub";
    if (index === 2) return "e.g., Anaesthetics";
    if (index === 3) return "e.g., Recovery";
    return `e.g., ${unitLeadSlotLabel(0, index)}`;
  };
  const coordinatorText = (unitIdx: number, index: number) => {
    const baseLabel = unitLeadBaseLabel(unitIdx, index);
    const preference = contactPreferencePerUnit[unitIdx] || "label";
    const hasContact = leadHasContactPerUnit[unitIdx]?.[index - 1];
    const contactValue = leadContactValuePerUnit[unitIdx]?.[index - 1]?.trim();
    if (preference === "contact") return hasContact && contactValue ? contactValue : "Extension/Bleep";
    if (preference === "both") return hasContact && contactValue ? `${baseLabel} ${contactValue}` : baseLabel;
    return baseLabel;
  };
  const unitLeadPreviewLines = (unitIdx: number) =>
    Array.from({ length: coordinatorsPerUnit[unitIdx] || 1 }, (_, leadIdx) =>
      coordinatorText(unitIdx, leadIdx + 1)
    );
  const roomStaffTermForUnit = (unitIdx: number) => `${roomLabelTerm(unitIdx)} Staff`;
  const roomStaffPluralForUnit = (unitIdx: number) => {
    const term = roomStaffTermForUnit(unitIdx);
    return term.endsWith("s") ? term : `${term}s`;
  };
  const roomStaffSlotLabel = (unitIdx: number, index: number) =>
    `${roomStaffTermForUnit(unitIdx)} ${unitIdx + 1}${String.fromCharCode(64 + index)}`;
  const roomStaffBaseLabel = (unitIdx: number, index: number) => {
    const specification = roomStaffLabelsPerUnit[unitIdx]?.[index - 1]?.trim();
    return specification ? `${roomStaffTermForUnit(unitIdx)}-${specification}` : roomStaffSlotLabel(unitIdx, index);
  };
  const roomStaffSpecificationExample = (index: number) => {
    if (index === 1) return "e.g., Circulator";
    if (index === 2) return "e.g., Runner";
    if (index === 3) return "e.g., Support";
    return `e.g., ${roomStaffSlotLabel(0, index)}`;
  };
  const roomStaffText = (unitIdx: number, index: number) => {
    const baseLabel = roomStaffBaseLabel(unitIdx, index);
    const preference = roomStaffDisplayPreferencePerUnit[unitIdx] || "label";
    const hasContact = roomStaffHasContactPerUnit[unitIdx]?.[index - 1];
    const contactValue = roomStaffContactValuePerUnit[unitIdx]?.[index - 1]?.trim();
    if (preference === "contact") return hasContact && contactValue ? contactValue : "Extension/Bleep";
    if (preference === "both") return hasContact && contactValue ? `${baseLabel} ${contactValue}` : baseLabel;
    return baseLabel;
  };
  const roomStaffPreviewLines = (unitIdx: number) =>
    Array.from({ length: roomStaffCountPerUnit[unitIdx] || 1 }, (_, staffIdx) =>
      roomStaffText(unitIdx, staffIdx + 1)
    );
  const roomStaffRoleOptionsForUnit = (unitIdx: number) =>
    Array.from(
      new Set(
        [
          ...(roomStaffRoleEntriesPerUnit[unitIdx] || []),
          ...(secondaryRoomStaffRoleEntriesPerUnit[unitIdx] || []),
        ]
          .map((role) => role.trim())
          .filter(Boolean)
      )
    );
  const isRoleSubsectionOpen = (key: string) => openRoleSubsections.includes(key);
  const toggleRoleSubsection = (key: string) => {
    setOpenRoleSubsections((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };
  const getEContent = (row: number) => {
    for (let i = 0; i < activeAuxiliaryStaffGroups.length; i += 1) {
      const labelRow = 5 + i * 3;
      const slotRow = labelRow + 2;
      if (row === labelRow) return activeAuxiliaryStaffGroups[i].toUpperCase();
      if (row === slotRow) return auxiliaryGroupSlotPlaceholder(activeAuxiliaryStaffGroups[i], i);
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
    for (let i = 0; i < activeAuxiliaryStaffGroups.length; i += 1) {
      const labelRow = 5 + i * 3;
      const slotRow = labelRow + 2;
      if (row === labelRow) return "label";
      if (row === slotRow) return "slot";
    }
    return "empty";
  };

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
  const roomStaffSlotText = (unitIdx: number, slotNumber: number) => {
    const value = roomStaffSlotAssignmentsPerUnit[unitIdx]?.[slotNumber - 1]?.trim() || "";
    if (!value || value === "Empty / On Standby") return "";
    return slotNumber === 1 ? `${value} *` : value;
  };
  const slotTextStyle = { fontSize: "20px" };
  const renderSheetPage = (pageStart: number) => {
    const pageUnitCount = Math.min(2, unitCount - pageStart);
    const pageIsSingle = pageUnitCount === 1;
    const leftUnitIndex = pageStart;
    const rightUnitIndex = pageStart + 1;
    const leftUnitName = unitNamesArr[leftUnitIndex] || `Unit ${leftUnitIndex + 1}`;
    const rightUnitName =
      pageUnitCount > 1 ? unitNamesArr[rightUnitIndex] || `Unit ${rightUnitIndex + 1}` : "";
    const leftRooms = unitsPerUnit[leftUnitIndex] || subunitsPerUnit || 8;
    const rightRooms = pageUnitCount > 1 ? unitsPerUnit[rightUnitIndex] || subunitsPerUnit || 8 : 0;
    const leftCoordinators = coordinatorsPerUnit[leftUnitIndex] || 1;
    const rightCoordinators = pageUnitCount > 1 ? coordinatorsPerUnit[rightUnitIndex] || 1 : 0;
    const shouldMergeLeftBHeader = pageIsSingle && leftCoordinators === 1;
    const maxRooms = pageUnitCount > 1 ? Math.max(leftRooms, rightRooms) : leftRooms;
    const pageRows: ReactElement[] = [];
    let pageRow = 1;
    const rightSections: Array<{ label: string; rows: number; prefix: string }> = [];
    if (pageUnitCount > 1 && hasNightUnit) {
      rightSections.push({ label: "Hosp Night Unit", rows: 15, prefix: `${rightUnitIndex + 1}.9.` });
    }
    if (pageUnitCount > 1 && hasSatelliteUnit) {
      rightSections.push({ label: satelliteLabel, rows: 6, prefix: "S.1." });
    }
    let rightSectionIndex = 0;
    let rightSectionRow = 0;
    const currentRightSection = () => rightSections[rightSectionIndex] ?? null;
    const remainingRightRows = () => {
      const section = currentRightSection();
      if (!section) return 0;
      let total = section.rows - rightSectionRow;
      for (let i = rightSectionIndex + 1; i < rightSections.length; i += 1) total += rightSections[i].rows;
      return total;
    };
    const pushRow = (cells: Array<ReactElement | null>) => {
      pageRows.push(<tr key={`p-${pageStart}-r-${pageRow}`}>{cells}</tr>);
      pageRow += 1;
    };
    const appendRightExtraCells = (cells: Array<ReactElement | null>) => {
      const section = currentRightSection();
      if (!section) {
        cells.push(<td key="c" className="unit-empty"></td>);
        cells.push(<td key="d" className="unit-empty"></td>);
        return false;
      }
      const isFirstRow = rightSectionRow === 0;
      if (isFirstRow) {
        cells.push(
          <td key="c" rowSpan={section.rows} className="block-label">
            {cellRef("C", pageRow)}
            {section.label}
          </td>
        );
      }
      const slotIndex = rightSectionRow + 1;
      cells.push(
        <td key="d" className="slot-cell slot-cell-dual" style={slotTextStyle}>
          {cellRef("D", pageRow)}
          <span className="slot-placeholder" style={{ fontWeight: 400 }}></span>
        </td>
      );
      rightSectionRow += 1;
      if (rightSectionRow >= section.rows) {
        rightSectionIndex += 1;
        rightSectionRow = 0;
      }
      return true;
    };

    pushRow([
      leftCoordinators === 1 ? (
        <td key="a" rowSpan={2} className="header-cell">
          {cellRef("A", pageRow)}
          {coordinatorText(leftUnitIndex, 1)}
        </td>
      ) : (
        <td key="a" className="header-cell">
          {cellRef("A", pageRow)}
          {coordinatorText(leftUnitIndex, 1)}
        </td>
      ),
      shouldMergeLeftBHeader ? (
        <td key="b" rowSpan={2}>
          {cellRef("B", pageRow)}
        </td>
      ) : (
        <td key="b">
          {cellRef("B", pageRow)}
        </td>
      ),
      pageUnitCount > 1 ? (
        rightCoordinators === 1 ? (
          <td key="c" rowSpan={2} className="header-cell">
            {cellRef("C", pageRow)}
            {coordinatorText(rightUnitIndex, 1)}
          </td>
        ) : (
          <td key="c" className="header-cell">
            {cellRef("C", pageRow)}
            {coordinatorText(rightUnitIndex, 1)}
          </td>
        )
      ) : null,
      pageUnitCount > 1 ? (
        rightCoordinators === 1 ? (
          <td key="d" rowSpan={2}>
            {cellRef("D", pageRow)}
          </td>
        ) : (
          <td key="d">
            {cellRef("D", pageRow)}
          </td>
        )
      ) : null,
      <td key="e" className={eCellProps(pageRow).className} style={eCellProps(pageRow).style}>{eCell(pageRow)}</td>,
    ].filter(Boolean));

    pushRow([
      leftCoordinators > 1 ? (
        <td key="a" className="header-cell">
          {cellRef("A", pageRow)}
          {coordinatorText(leftUnitIndex, 2)}
        </td>
      ) : null,
      shouldMergeLeftBHeader ? null : (
        <td key="b">
          {cellRef("B", pageRow)}
        </td>
      ),
      pageUnitCount > 1 && rightCoordinators > 1 ? (
        <td key="c" className="header-cell">
          {cellRef("C", pageRow)}
          {coordinatorText(rightUnitIndex, 2)}
        </td>
      ) : null,
      pageUnitCount > 1 && rightCoordinators > 1 ? (
        <td key="d">
          {cellRef("D", pageRow)}
        </td>
      ) : null,
      <td key="e" className={eCellProps(pageRow).className} style={eCellProps(pageRow).style}>{eCell(pageRow)}</td>,
    ].filter(Boolean));

    pushRow([
      <td key="a" rowSpan={2} className="section-cell">{cellRef("A", pageRow)}{leftUnitName}</td>,
      <td key="b" rowSpan={2}>{cellRef("B", pageRow)}</td>,
      pageUnitCount > 1 ? <td key="c" rowSpan={2} className="section-cell">{cellRef("C", pageRow)}{rightUnitName}</td> : null,
      pageUnitCount > 1 ? <td key="d" rowSpan={2}>{cellRef("D", pageRow)}</td> : null,
      <td key="e" className={eCellProps(pageRow).className} style={eCellProps(pageRow).style}>{eCell(pageRow)}</td>,
    ].filter(Boolean));

    pushRow([
      <td key="a" className="unit-empty"></td>,
      <td key="b" className="unit-empty"></td>,
      pageUnitCount > 1 ? <td key="c" className="unit-empty"></td> : null,
      pageUnitCount > 1 ? <td key="d" className="unit-empty"></td> : null,
      <td key="e" className={eCellProps(pageRow).className} style={eCellProps(pageRow).style}>{eCell(pageRow)}</td>,
    ].filter(Boolean));

    for (let roomNum = 1; roomNum <= maxRooms; roomNum += 1) {
      for (let offset = 0; offset < 6; offset += 1) {
        const inRoomSection = offset < 3;
        const slotNumber = offset + 1;
        const leftHasRoom = roomNum <= leftRooms;
        const rightHasRoom = roomNum <= rightRooms;
        const leftClosed = specialtiesPerUnit[leftUnitIndex]?.[roomNum - 1]?.sessionCount === "closed";
        const rightClosed =
          pageUnitCount > 1 && specialtiesPerUnit[rightUnitIndex]?.[roomNum - 1]?.sessionCount === "closed";
        const cells: Array<ReactElement | null> = [];

        if (inRoomSection && offset === 0) {
          cells.push(
            leftHasRoom ? (
              <td key="a" rowSpan={3} className="block-label room-label">{cellRef("A", pageRow)}{roomLabel(leftUnitIndex, leftUnitName, roomNum)}</td>
            ) : (
              <td key="a" className="unit-empty"></td>
            )
          );
        } else if (!inRoomSection && offset === 3) {
          cells.push(
            leftHasRoom ? (
              <td key="a" rowSpan={3} className="block-label">{cellRef("A", pageRow)}{specialtyLabelForUnitRoom(leftUnitIndex, roomNum)}</td>
            ) : (
              <td key="a" className="unit-empty"></td>
            )
          );
        } else if (!leftHasRoom) {
          cells.push(<td key="a" className="unit-empty"></td>);
        }

        if (leftHasRoom) {
          if (leftClosed) {
            if (offset === 0) {
              cells.push(
                <td key="b" rowSpan={6} className="slot-cell slot-cell-dual slot-cell-closed">
                  {cellRef("B", pageRow)}
                  <span className="slot-cell-closed-text">CLOSED</span>
                </td>
              );
            }
          } else {
            const leftSlotClass = [offset < 5 ? "no-border-bottom" : "", offset > 0 ? "no-border-top" : ""]
              .filter(Boolean)
              .join(" ");
            cells.push(
              <td key="b" className={`${leftSlotClass} slot-cell slot-cell-dual`.trim()} style={slotTextStyle}>
                {cellRef("B", pageRow)}
                <span className="slot-placeholder" style={{ fontWeight: 400 }}></span>
                <span className="slot-name">{roomStaffSlotText(leftUnitIndex, slotNumber)}</span>
              </td>
            );
          }
        } else {
          cells.push(<td key="b" className="unit-empty"></td>);
        }

        if (pageUnitCount > 1) {
          let rightColumnOccupied = rightHasRoom;
          if (inRoomSection && offset === 0 && rightHasRoom) {
            cells.push(
              <td key="c" rowSpan={3} className="block-label room-label">{cellRef("C", pageRow)}{roomLabel(rightUnitIndex, rightUnitName, roomNum)}</td>
            );
          } else if (!inRoomSection && offset === 3 && rightHasRoom) {
            cells.push(
              <td key="c" rowSpan={3} className="block-label">{cellRef("C", pageRow)}{specialtyLabelForUnitRoom(rightUnitIndex, roomNum)}</td>
            );
          }

          if (rightHasRoom) {
            if (rightClosed) {
              if (offset === 0) {
                cells.push(
                  <td key="d" rowSpan={6} className="slot-cell slot-cell-dual slot-cell-closed">
                    {cellRef("D", pageRow)}
                    <span className="slot-cell-closed-text">CLOSED</span>
                  </td>
                );
              }
            } else {
              const rightSlotClass = [offset < 5 ? "no-border-bottom" : "", offset > 0 ? "no-border-top" : ""]
                .filter(Boolean)
                .join(" ");
              cells.push(
                <td key="d" className={`${rightSlotClass} slot-cell slot-cell-dual`.trim()} style={slotTextStyle}>
                  {cellRef("D", pageRow)}
                  <span className="slot-placeholder" style={{ fontWeight: 400 }}></span>
                  <span className="slot-name">{roomStaffSlotText(rightUnitIndex, slotNumber)}</span>
                </td>
              );
            }
          } else {
            rightColumnOccupied = appendRightExtraCells(cells);
          }

          const eLeftBorderClass = !rightColumnOccupied ? " no-border-left" : "";
          const eStyle = !rightColumnOccupied ? { ...eCellProps(pageRow).style, borderLeft: "none" } : eCellProps(pageRow).style;
          cells.push(
            <td key="e" className={`${eCellProps(pageRow).className}${eLeftBorderClass}`} style={eStyle}>
              {eCell(pageRow)}
            </td>
          );
        } else {
          cells.push(
            <td key="e" className={eCellProps(pageRow).className} style={eCellProps(pageRow).style}>
              {eCell(pageRow)}
            </td>
          );
        }

        pushRow(cells.filter(Boolean));
      }
    }

    let appendedRightContinuation = false;
    while (pageUnitCount > 1 && currentRightSection()) {
      const cells: Array<ReactElement | null> = [];
      if (!appendedRightContinuation) {
        const totalRemaining = remainingRightRows();
        cells.push(<td key="a" rowSpan={totalRemaining} className="unit-empty"></td>);
        cells.push(<td key="b" rowSpan={totalRemaining} className="unit-empty"></td>);
        appendedRightContinuation = true;
      }
      appendRightExtraCells(cells);
      cells.push(
        <td key="e" className={eCellProps(pageRow).className} style={eCellProps(pageRow).style}>
          {eCell(pageRow)}
        </td>
      );
      pushRow(cells);
    }

    return (
      <div key={`sheet-page-${pageStart}`} className="sheet-page">
        <div className="sheet-print-wrap">
          <table className={`sheet${pageIsSingle ? " single-unit" : ""}${showPlaceholders ? "" : " hide-placeholders"}`}>
            <colgroup>
              {pageIsSingle ? (
                <>
                  <col className="col-a" style={{ width: "26%" }} />
                  <col className="col-b" style={{ width: "44%" }} />
                  <col className="col-e" style={{ width: "30%" }} />
                </>
              ) : (
                <>
                  <col className="col-a" style={{ width: "16.5%" }} />
                  <col className="col-b" style={{ width: "21.5%" }} />
                  <col className="col-c" style={{ width: "16.5%" }} />
                  <col className="col-d" style={{ width: "21.5%" }} />
                  <col className="col-e" style={{ width: "24%" }} />
                </>
              )}
            </colgroup>
            <tbody>{pageRows}</tbody>
          </table>
        </div>
      </div>
    );
  };
  const pageStarts = Array.from({ length: Math.ceil(unitCount / 2) }, (_, idx) => idx * 2);

  const isSectionOpen = (section: number) => openSections.includes(section);
  const openPanelSection = (section: number) => {
    setActiveSection(section);
    setOpenSections((prev) => (prev.includes(section) ? prev : [...prev, section]));
  };
  const togglePanelSection = (section: number) => {
    setActiveSection(section);
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((item) => item !== section) : [...prev, section]
    );
  };

  return (
    <main className={`allocation-page ${printPaper === "A4" ? "print-a4" : "print-a3"}`}>
      <div className={`split-layout${isPanelCollapsed ? " is-panel-collapsed" : ""}`}>
        <aside className={`left-panel no-print${isPanelCollapsed ? " is-collapsed" : ""}`}>
          <div className="left-panel-shell">
            <div className="left-panel-hero">
              <div className="left-panel-hero-bar">
                <div>
                  <div className="left-panel-eyebrow">Allocation Template Builder</div>
                  <div className="left-panel-title">Control Panel</div>
                </div>
                <button
                  type="button"
                  className="panel-collapse-button"
                  aria-label={isPanelCollapsed ? "Expand control panel" : "Collapse control panel"}
                  aria-pressed={isPanelCollapsed}
                  onClick={() => setIsPanelCollapsed((prev) => !prev)}
                >
                  {isPanelCollapsed ? ">" : "<"}
                </button>
              </div>
              <div className="left-panel-subtitle">
                Configure the template on the left. The printable table on the right stays untouched.
              </div>
            </div>

            <div className="left-panel-body">
              <div className="panel-stack">
                <section className={`panel-card${isSectionOpen(1) ? " is-open" : ""}${activeSection === 1 ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="panel-card-toggle"
                    onClick={() => togglePanelSection(1)}
                    aria-expanded={isSectionOpen(1)}
                  >
                    <span className="panel-card-copy">
                      <span className="panel-card-title">Header</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(1) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(1) ? " is-open" : ""}`}>
                    <div className="panel-card-inner">
                      <div className="form-grid">
                        <div className="form-row form-row-compact">
                          <label className="form-label">What is the department/site name?</label>
                          <input
                            className="form-input"
                            type="text"
                            value={departmentSiteName}
                            onChange={(e) => setDepartmentSiteName(e.target.value)}
                            placeholder="e.g., Endoscopy / Royal London"
                          />
                          <label className="form-label">What date is this template for?</label>
                          <input
                            className="form-input"
                            type="date"
                            value={allocationDate}
                            onChange={(e) => setAllocationDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className={`panel-card${isSectionOpen(2) ? " is-open" : ""}${activeSection === 2 ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="panel-card-toggle"
                    onClick={() => togglePanelSection(2)}
                    aria-expanded={isSectionOpen(2)}
                  >
                    <span className="panel-card-copy">
                      <span className="panel-card-title">Unit</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(2) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(2) ? " is-open" : ""}`}>
                    <div className="panel-card-inner">
                      <div className="form-grid">
                        <div className="form-row form-row-compact">
                          <label className="form-label">How many day units do you need on this template?</label>
                          <div className="radio-group radio-group-inline radio-group-plain">
                            {[1, 2, 3, 4].map((count) => (
                              <label className="radio-item" key={`unit-count-${count}`}>
                                <input
                                  type="radio"
                                  name="unitCount"
                                  value={count}
                                  checked={unitCount === count}
                                  onChange={() => {
                                    const next = count;
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
                                    setSubunitLabelPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push("Room");
                                      return copy.slice(0, next);
                                    });
                                    setSpecialtiesPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) {
                                        copy.push(Array.from({ length: 8 }, () => emptySpecialtySelection()));
                                      }
                                      return copy.slice(0, next);
                                    });
                                    setRoomStartPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(1);
                                      return copy.slice(0, next);
                                    });
                                    setCoordinatorsPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(1);
                                      return copy.slice(0, next);
                                    });
                                    setContactPreferencePerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push("label");
                                      return copy.slice(0, next);
                                    });
                                    setLeadHasContactPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push([false, false]);
                                      return copy.slice(0, next);
                                    });
                                    setLeadContactValuePerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(["", ""]);
                                      return copy.slice(0, next);
                                    });
                                    setRoomStaffRoleEntriesPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push([""]);
                                      return copy.slice(0, next);
                                    });
                                    setHasSecondaryRolesPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(false);
                                      return copy.slice(0, next);
                                    });
                                    setSecondaryRoomStaffRoleEntriesPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push([""]);
                                      return copy.slice(0, next);
                                    });
                                    setRoomStaffSlotAssignmentsPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(["", "", "", "", "", ""]);
                                      return copy.slice(0, next);
                                    });
                                    setRoomStaffCountPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(2);
                                      return copy.slice(0, next);
                                    });
                                    setRoomStaffDisplayPreferencePerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push("label");
                                      return copy.slice(0, next);
                                    });
                                    setRoomStaffLabelsPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(["", ""]);
                                      return copy.slice(0, next);
                                    });
                                    setRoomStaffHasContactPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push([false, false]);
                                      return copy.slice(0, next);
                                    });
                                    setRoomStaffContactValuePerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(["", ""]);
                                      return copy.slice(0, next);
                                    });
                                    setCoordinatorLabelsPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(["", ""]);
                                      return copy.slice(0, next);
                                    });
                                  }}
                                />
                                {count}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="form-row form-row-compact">
                          <label className="form-label form-label-with-hint">
                            <span>How should room sequencing appear?</span>
                            <button
                              type="button"
                              className="info-badge-button"
                              aria-label="Show room sequencing help"
                              aria-expanded={showRoomSequencingHint}
                              onClick={() => setShowRoomSequencingHint((prev) => !prev)}
                            >
                              <span className="info-badge">i</span>
                            </button>
                          </label>
                          {showRoomSequencingHint ? (
                            <div className="field-hint">Example: Numerical uses Room 1, Room 2. Alphabetical uses Room A, Room B.</div>
                          ) : null}
                          <div className="radio-group radio-group-inline radio-group-plain">
                            <label className="radio-item">
                              <input
                                type="radio"
                                name="roomLabelMode"
                                value="number"
                                checked={roomLabelMode === "number"}
                                onChange={() => setRoomLabelMode("number")}
                              />
                              Numerical
                            </label>
                            <label className="radio-item">
                              <input
                                type="radio"
                                name="roomLabelMode"
                                value="letter"
                                checked={roomLabelMode === "letter"}
                                onChange={() => setRoomLabelMode("letter")}
                              />
                              Alphabetical
                            </label>
                          </div>
                        </div>

                        <div className="unit-cards-grid">
                          {Array.from({ length: unitCount }, (_, i) => (
                            <div className="form-row unit-config-card" key={`unit-${i}`}>
                            <div className="panel-section-title">{`Unit ${i + 1}`}</div>
                            <label className="form-label">Label</label>
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
                            <label className="form-label">How would you call your rooms?</label>
                            <input
                              className="form-input"
                              type="text"
                              value={subunitLabelPerUnit[i] || "Room"}
                              onChange={(e) => {
                                const next = [...subunitLabelPerUnit];
                                next[i] = e.target.value;
                                setSubunitLabelPerUnit(next);
                              }}
                              placeholder="e.g., Theatre"
                            />
                            <label className="form-label">No. of Rooms</label>
                            <input
                              className="form-input"
                              type="number"
                              min="1"
                              value={unitsPerUnit[i] || 1}
                              onChange={(e) => {
                                const next = [...unitsPerUnit];
                                const roomCount = Number(e.target.value) || 1;
                                next[i] = roomCount;
                                setUnitsPerUnit(next);
                                setSpecialtiesPerUnit((prev) => {
                                  const outer = [...prev];
                                  while (outer.length < unitCount) {
                                    outer.push(Array.from({ length: 8 }, () => emptySpecialtySelection()));
                                  }
                                  const current = [...(outer[i] || [])];
                                  while (current.length < roomCount) current.push(emptySpecialtySelection());
                                  outer[i] = current.slice(0, roomCount);
                                  return outer;
                                });
                              }}
                              placeholder="e.g., 8"
                            />
                            <label className="form-label">{`Start ${roomLabelTerm(i)} labels in Unit ${i + 1} from`}</label>
                            <input
                              className="form-input"
                              type={roomLabelMode === "number" ? "number" : "text"}
                              min={roomLabelMode === "number" ? "1" : undefined}
                              value={
                                roomLabelMode === "number"
                                  ? String(roomStartPerUnit[i] || 1)
                                  : indexToLetters(roomStartPerUnit[i] || 1)
                              }
                              onChange={(e) => {
                                const next = [...roomStartPerUnit];
                                next[i] =
                                  roomLabelMode === "number"
                                    ? Math.max(1, Number(e.target.value) || 1)
                                    : lettersToIndex(e.target.value);
                                setRoomStartPerUnit(next);
                              }}
                              placeholder={roomLabelMode === "number" ? "e.g., 1" : "e.g., A"}
                            />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className={`panel-card${isSectionOpen(3) ? " is-open" : ""}${activeSection === 3 ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="panel-card-toggle"
                    onClick={() => togglePanelSection(3)}
                    aria-expanded={isSectionOpen(3)}
                  >
                    <span className="panel-card-copy">
                      <span className="panel-card-title">Specialty Services</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(3) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(3) ? " is-open" : ""}`}>
                    <div className="panel-card-inner">
                      <div className="section-intro">
                        <div>Assign specialty labels to each room.</div>
                        <div className="section-intro-note">Use A for Specialty.</div>
                        <div className="section-intro-note">Use B for Subspecialty.</div>
                        <div className="section-intro-note">Use C for Session Count.</div>
                      </div>
                      <div className="unit-cards-grid">
                        {Array.from({ length: unitCount }, (_, i) => (
                          <div className="form-row unit-config-card" key={`specialty-unit-${i}`}>
                            <div className="panel-section-title">{`Unit ${i + 1}`}</div>
                            <div className="specialty-stack-list" aria-label={`Specialty setup for unit ${i + 1}`}>
                                {Array.from({ length: unitsPerUnit[i] || 0 }, (_, roomIdx) => (
                                  <div className="specialty-stack-item" key={`specialty-${i}-${roomIdx}`}>
                                    <div className="specialty-room-header">
                                    <div className="specialty-room-title">
                                        {`${roomLabelTerm(i)} ${roomTokenForUnit(i, roomIdx + 1)}`}
                                      </div>
                                      <button
                                        type="button"
                                        className="specialty-reset-button"
                                        aria-label={`Reset ${roomLabelTerm(i)} ${roomTokenForUnit(i, roomIdx + 1)}`}
                                        title={`Reset ${roomLabelTerm(i)} ${roomTokenForUnit(i, roomIdx + 1)}`}
                                        onClick={() => {
                                          setSpecialtiesPerUnit((prev) => {
                                            const outer = [...prev];
                                            while (outer.length < unitCount) {
                                              outer.push(Array.from({ length: 8 }, () => emptySpecialtySelection()));
                                            }
                                            const current = [...(outer[i] || [])];
                                            while (current.length < (unitsPerUnit[i] || 0)) current.push(emptySpecialtySelection());
                                            current[roomIdx] = emptySpecialtySelection();
                                            outer[i] = current;
                                            return outer;
                                          });
                                        }}
                                      >
                                        ⟲
                                      </button>
                                    </div>
                                    <div className="specialty-stack-field">
                                      <label className="specialty-stack-label">A</label>
                                      <select
                                        className={`form-input specialty-select${
                                          specialtiesPerUnit[i]?.[roomIdx]?.sessionCount === "closed"
                                            ? " is-closed"
                                            : specialtiesPerUnit[i]?.[roomIdx]?.specialty
                                              ? " is-filled"
                                              : " is-empty"
                                        }`}
                                        value={specialtiesPerUnit[i]?.[roomIdx]?.specialty || ""}
                                        onChange={(e) => {
                                          const specialty = e.target.value;
                                          setSpecialtiesPerUnit((prev) => {
                                            const outer = [...prev];
                                            while (outer.length < unitCount) {
                                              outer.push(Array.from({ length: 8 }, () => emptySpecialtySelection()));
                                            }
                                            const current = [...(outer[i] || [])];
                                            while (current.length < (unitsPerUnit[i] || 0)) current.push(emptySpecialtySelection());
                                            const nextOptions = specialty ? specialtyCatalog[specialty] || [] : [];
                                            current[roomIdx] = {
                                              specialty,
                                              subspecialty: nextOptions[0] || "",
                                              sessionCount: current[roomIdx]?.sessionCount || "",
                                            };
                                            outer[i] = current;
                                            return outer;
                                          });
                                        }}
                                      >
                                        <option value="">Select specialty</option>
                                        {Object.keys(specialtyCatalog).map((specialty) => (
                                          <option key={specialty} value={specialty}>
                                            {specialty}
                                          </option>
                                          ))}
                                      </select>
                                    </div>
                                    <div className="specialty-stack-field">
                                      <label className="specialty-stack-label">B</label>
                                      <select
                                        className={`form-input specialty-select${
                                          specialtiesPerUnit[i]?.[roomIdx]?.sessionCount === "closed"
                                            ? " is-closed"
                                            : specialtiesPerUnit[i]?.[roomIdx]?.subspecialty
                                              ? " is-filled"
                                              : " is-empty"
                                        }`}
                                        value={specialtiesPerUnit[i]?.[roomIdx]?.subspecialty || ""}
                                        onChange={(e) => {
                                          const subspecialty = e.target.value;
                                          setSpecialtiesPerUnit((prev) => {
                                            const outer = [...prev];
                                            while (outer.length < unitCount) {
                                              outer.push(Array.from({ length: 8 }, () => emptySpecialtySelection()));
                                            }
                                            const current = [...(outer[i] || [])];
                                            while (current.length < (unitsPerUnit[i] || 0)) current.push(emptySpecialtySelection());
                                            current[roomIdx] = {
                                              specialty: current[roomIdx]?.specialty || "",
                                              subspecialty,
                                              sessionCount: current[roomIdx]?.sessionCount || "",
                                            };
                                            outer[i] = current;
                                            return outer;
                                          });
                                        }}
                                        disabled={!specialtiesPerUnit[i]?.[roomIdx]?.specialty}
                                      >
                                        <option value="">
                                          {specialtiesPerUnit[i]?.[roomIdx]?.specialty ? "Select subspecialty" : "Choose specialty first"}
                                        </option>
                                        {((specialtiesPerUnit[i]?.[roomIdx]?.specialty &&
                                          specialtyCatalog[specialtiesPerUnit[i][roomIdx].specialty]) ||
                                          []
                                        ).map((subspecialty) => (
                                          <option key={subspecialty} value={subspecialty}>
                                            {subspecialty}
                                          </option>
                                          ))}
                                      </select>
                                    </div>
                                    <div className="specialty-stack-field">
                                      <label className="specialty-stack-label">C</label>
                                      <select
                                        className={`form-input specialty-select specialty-session-select${
                                          specialtiesPerUnit[i]?.[roomIdx]?.sessionCount
                                            ? specialtiesPerUnit[i]?.[roomIdx]?.sessionCount === "closed"
                                              ? " is-closed"
                                              : " is-filled"
                                            : " is-empty"
                                        }`}
                                        value={specialtiesPerUnit[i]?.[roomIdx]?.sessionCount || ""}
                                        onChange={(e) => {
                                          const sessionCount = e.target.value;
                                          setSpecialtiesPerUnit((prev) => {
                                            const outer = [...prev];
                                            while (outer.length < unitCount) {
                                              outer.push(Array.from({ length: 8 }, () => emptySpecialtySelection()));
                                            }
                                            const current = [...(outer[i] || [])];
                                            while (current.length < (unitsPerUnit[i] || 0)) current.push(emptySpecialtySelection());
                                            current[roomIdx] = {
                                              specialty: current[roomIdx]?.specialty || "",
                                              subspecialty: current[roomIdx]?.subspecialty || "",
                                              sessionCount,
                                            };
                                            outer[i] = current;
                                            return outer;
                                          });
                                        }}
                                      >
                                        <option value="">Session Count</option>
                                        <option value="x1">x1</option>
                                        <option value="x2">x2</option>
                                        <option value="x3">x3</option>
                                        <option value="closed">CLOSED</option>
                                      </select>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className={`panel-card${isSectionOpen(4) ? " is-open" : ""}${activeSection === 4 ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="panel-card-toggle"
                    onClick={() => togglePanelSection(4)}
                    aria-expanded={isSectionOpen(4)}
                  >
                    <span className="panel-card-copy">
                      <span className="panel-card-title">Other Services</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(4) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(4) ? " is-open" : ""}`}>
                    <div className="panel-card-inner">
                      <div className="form-grid">
                        <div className="form-row form-row-compact">
                          <label className="form-label">Night Unit Service</label>
                          <div className="radio-group radio-group-inline">
                            <label className="radio-item"><input type="radio" name="nightUnit" value="yes" checked={hasNightUnit} onChange={() => setHasNightUnit(true)} />Yes</label>
                            <label className="radio-item"><input type="radio" name="nightUnit" value="no" checked={!hasNightUnit} onChange={() => setHasNightUnit(false)} />No</label>
                          </div>
                        </div>

                        <div className="form-row form-row-compact">
                          <label className="form-label">Satellite Service</label>
                          <div className="radio-group radio-group-inline">
                            <label className="radio-item"><input type="radio" name="satelliteUnit" value="yes" checked={hasSatelliteUnit} onChange={() => setHasSatelliteUnit(true)} />Yes</label>
                            <label className="radio-item"><input type="radio" name="satelliteUnit" value="no" checked={!hasSatelliteUnit} onChange={() => setHasSatelliteUnit(false)} />No</label>
                          </div>
                        </div>

                        {hasSatelliteUnit && (
                          <div className="form-row form-row-compact">
                            <label className="form-label">Satellite Unit Label</label>
                            <input
                              className="form-input"
                              type="text"
                              value={satelliteUnits}
                              onChange={(e) => setSatelliteUnits(e.target.value)}
                              placeholder="e.g., Satellite Day Unit"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section className={`panel-card${isSectionOpen(5) ? " is-open" : ""}${activeSection === 5 ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="panel-card-toggle"
                    onClick={() => togglePanelSection(5)}
                    aria-expanded={isSectionOpen(5)}
                  >
                    <span className="panel-card-copy">
                      <span className="panel-card-title">Roles</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(5) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(5) ? " is-open" : ""}`}>
                    <div className="panel-card-inner">
                      <div className="subsection-stack">
                        <section className={`subsection-card${isRoleSubsectionOpen("unitLead") ? " is-open" : ""}`}>
                          <button
                            type="button"
                            className="subsection-toggle"
                            onClick={() => toggleRoleSubsection("unitLead")}
                            aria-expanded={isRoleSubsectionOpen("unitLead")}
                          >
                            <span className="subsection-title">Unit Lead</span>
                            <span className={`subsection-icon${isRoleSubsectionOpen("unitLead") ? " is-open" : ""}`}>&gt;</span>
                          </button>
                          <div className={`subsection-body${isRoleSubsectionOpen("unitLead") ? " is-open" : ""}`}>
                            <div className="subsection-inner">
                              <div className="form-grid">
                                <div className="form-row form-row-compact">
                                  <label className="form-label">What do you call your Unit Lead?</label>
                                  <input
                                    className="form-input"
                                    type="text"
                                    value={leadRoleLabel}
                                    onChange={(e) => setLeadRoleLabel(e.target.value)}
                                    placeholder="e.g., Coordinator"
                                  />
                                </div>

                                <div className="unit-cards-grid">
                                  {Array.from({ length: unitCount }, (_, i) => (
                                    <div className="form-row unit-config-card" key={`coord-${i}`}>
                                      <div className="panel-section-title">{`Unit ${i + 1}`}</div>
                                      <label className="form-label">
                                        {`How many ${unitLeadPlural} are assigned to this unit?`}
                                      </label>
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
                                      <label className="form-label">What specification label should be used for this unit?</label>
                                      {Array.from({ length: coordinatorsPerUnit[i] || 1 }, (_, leadIdx) => (
                                        <div className="lead-spec-block" key={`coord-label-${i}-${leadIdx}`}>
                                          <label className="form-label">{unitLeadSlotLabel(i, leadIdx + 1)}</label>
                                          <input
                                            className="form-input"
                                            type="text"
                                            value={coordinatorLabelsPerUnit[i]?.[leadIdx] || ""}
                                            onChange={(e) =>
                                              setCoordinatorLabelsPerUnit((prev) => {
                                                const next = [...prev];
                                                while (next.length < unitCount) next.push(["", ""]);
                                                const unitLabels = [...(next[i] || ["", ""])];
                                                unitLabels[leadIdx] = e.target.value;
                                                next[i] = unitLabels;
                                                return next;
                                              })
                                            }
                                            placeholder={unitLeadSpecificationExample(leadIdx + 1)}
                                          />
                                          <label className="form-label">
                                            {`Does the "${unitLeadBaseLabel(i, leadIdx + 1)}" have a contact/extension number?`}
                                          </label>
                                          <button
                                            type="button"
                                            className="toggle"
                                            aria-pressed={Boolean(leadHasContactPerUnit[i]?.[leadIdx])}
                                            onClick={() =>
                                              setLeadHasContactPerUnit((prev) => {
                                                const next = [...prev];
                                                while (next.length < unitCount) next.push([false, false]);
                                                const unitFlags = [...(next[i] || [false, false])];
                                                unitFlags[leadIdx] = !unitFlags[leadIdx];
                                                next[i] = unitFlags;
                                                return next;
                                              })
                                            }
                                          >
                                            <span className={`toggle-track${leadHasContactPerUnit[i]?.[leadIdx] ? " is-on" : ""}`}>
                                              <span className="toggle-thumb"></span>
                                            </span>
                                            <span className="toggle-label">{leadHasContactPerUnit[i]?.[leadIdx] ? "Yes" : "No"}</span>
                                          </button>
                                          {leadHasContactPerUnit[i]?.[leadIdx] ? (
                                            <div className="lead-contact-followup">
                                              <label className="form-label">What is it?</label>
                                              <input
                                                className="form-input"
                                                type="text"
                                                value={leadContactValuePerUnit[i]?.[leadIdx] || ""}
                                                onChange={(e) =>
                                                  setLeadContactValuePerUnit((prev) => {
                                                    const next = [...prev];
                                                    while (next.length < unitCount) next.push(["", ""]);
                                                    const unitValues = [...(next[i] || ["", ""])];
                                                    unitValues[leadIdx] = e.target.value;
                                                    next[i] = unitValues;
                                                    return next;
                                                  })
                                                }
                                                placeholder="e.g., Ext 1490"
                                              />
                                            </div>
                                          ) : null}
                                        </div>
                                      ))}
                                      <label className="form-label">How should this appear on the template?</label>
                                      <select
                                        className="form-input"
                                        value={contactPreferencePerUnit[i] || "label"}
                                        onChange={(e) =>
                                          setContactPreferencePerUnit((prev) => {
                                            const next = [...prev];
                                            next[i] = e.target.value;
                                            return next;
                                          })
                                        }
                                      >
                                        <option value="label">Label only</option>
                                        <option value="contact">Contact only</option>
                                        <option value="both">Label + contact</option>
                                      </select>
                                      <div className="lead-preview">
                                        <div className="lead-preview-title">Preview example</div>
                                        {unitLeadPreviewLines(i).map((line, previewIdx) => (
                                          <div className="lead-preview-line" key={`lead-preview-${i}-${previewIdx}`}>
                                            {line}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section className={`subsection-card${isRoleSubsectionOpen("roomStaff") ? " is-open" : ""}`}>
                          <button
                            type="button"
                            className="subsection-toggle"
                            onClick={() => toggleRoleSubsection("roomStaff")}
                            aria-expanded={isRoleSubsectionOpen("roomStaff")}
                          >
                            <span className="subsection-title">{roomStaffSectionLabel}</span>
                            <span className={`subsection-icon${isRoleSubsectionOpen("roomStaff") ? " is-open" : ""}`}>&gt;</span>
                          </button>
                          <div className={`subsection-body${isRoleSubsectionOpen("roomStaff") ? " is-open" : ""}`}>
                            <div className="subsection-inner">
                              <div className="form-grid">
                                <div className="form-row">
                                  <label className="form-label">
                                    Apply the same default staffing to all registered rooms?
                                  </label>
                                  <button
                                    type="button"
                                    className="toggle"
                                    aria-pressed={roomStaffAppliesToAllUnits}
                                    onClick={() => setRoomStaffAppliesToAllUnits((prev) => !prev)}
                                  >
                                    <span className={`toggle-track${roomStaffAppliesToAllUnits ? " is-on" : ""}`}>
                                      <span className="toggle-thumb"></span>
                                    </span>
                                    <span className="toggle-label">{roomStaffAppliesToAllUnits ? "Yes" : "No"}</span>
                                  </button>
                                </div>
                                {roomStaffAppliesToAllUnits ? (
                                  <div className="form-row room-staff-shared-card">
                                    <div className="panel-section-title">{`${roomStaffCardBaseLabel} Team`}</div>
                                    <label className="form-label form-label-with-hint">
                                      <span>What are the primary staff roles assigned across all units?</span>
                                      <button
                                        type="button"
                                        className="info-badge-button"
                                        aria-label="Show primary staff roles help"
                                        aria-expanded={showPrimaryRoomStaffHint}
                                        onClick={() => setShowPrimaryRoomStaffHint((prev) => !prev)}
                                      >
                                        <span className="info-badge">i</span>
                                      </button>
                                    </label>
                                    {showPrimaryRoomStaffHint ? (
                                      <div className="field-hint">
                                        Enter the main day-to-day roles for this unit. These are the core roles you expect to appear by default.
                                      </div>
                                    ) : null}
                                    <div className="role-entry-list">
                                      {Array.from(
                                        { length: roomStaffRoleEntriesPerUnit[0]?.length || 1 },
                                        (_, roleIdx) => (
                                          <div className="role-entry-row" key={`room-staff-role-shared-${roleIdx}`}>
                                            <input
                                              className="form-input"
                                              type="text"
                                              value={roomStaffRoleEntriesPerUnit[0]?.[roleIdx] || ""}
                                              onChange={(e) =>
                                                setRoomStaffRoleEntriesPerUnit((prev) => {
                                                  const next = [...prev];
                                                  while (next.length < unitCount) next.push([""]);
                                                  roomStaffTargetsFor(0).forEach((targetIdx) => {
                                                    const unitRoles = [...(next[targetIdx] || [""])];
                                                    while (unitRoles.length <= roleIdx) unitRoles.push("");
                                                    unitRoles[roleIdx] = e.target.value;
                                                    next[targetIdx] = unitRoles;
                                                  });
                                                  return next;
                                                })
                                              }
                                              placeholder={
                                                roleIdx === 0
                                                  ? "e.g., Scrub Nurse"
                                                  : roleIdx === 1
                                                    ? "e.g., Scrub Practitioner"
                                                    : "e.g., Support"
                                              }
                                            />
                                            <div className="role-entry-actions">
                                              <button
                                                type="button"
                                                className="icon-action-button"
                                                aria-label="Add staff role"
                                                onClick={() =>
                                                  setRoomStaffRoleEntriesPerUnit((prev) => {
                                                    const next = [...prev];
                                                    while (next.length < unitCount) next.push([""]);
                                                    roomStaffTargetsFor(0).forEach((targetIdx) => {
                                                      const unitRoles = [...(next[targetIdx] || [""])];
                                                      unitRoles.push("");
                                                      next[targetIdx] = unitRoles;
                                                    });
                                                    return next;
                                                  })
                                                }
                                              >
                                                +
                                              </button>
                                              <button
                                                type="button"
                                                className="icon-action-button"
                                                aria-label="Remove staff role"
                                                onClick={() =>
                                                  setRoomStaffRoleEntriesPerUnit((prev) => {
                                                    const next = [...prev];
                                                    while (next.length < unitCount) next.push([""]);
                                                    roomStaffTargetsFor(0).forEach((targetIdx) => {
                                                      const unitRoles = [...(next[targetIdx] || [""])];
                                                      if (unitRoles.length > 1) unitRoles.splice(roleIdx, 1);
                                                      next[targetIdx] = unitRoles;
                                                    });
                                                    return next;
                                                  })
                                                }
                                                disabled={(roomStaffRoleEntriesPerUnit[0]?.length || 1) <= 1}
                                              >
                                                -
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <label className="form-label form-label-with-hint">
                                      <span>Are there secondary roles?</span>
                                      <button
                                        type="button"
                                        className="info-badge-button"
                                        aria-label="Show secondary roles help"
                                        aria-expanded={showSecondaryRoomStaffHint}
                                        onClick={() => setShowSecondaryRoomStaffHint((prev) => !prev)}
                                      >
                                        <span className="info-badge">i</span>
                                      </button>
                                    </label>
                                    {showSecondaryRoomStaffHint ? (
                                      <div className="field-hint">
                                        Secondary roles can be optional, standby, or future roles that are not part of the default template setup.
                                      </div>
                                    ) : null}
                                    <button
                                      type="button"
                                      className="toggle"
                                      aria-pressed={Boolean(hasSecondaryRolesPerUnit[0])}
                                      onClick={() =>
                                        setHasSecondaryRolesPerUnit((prev) => {
                                          const next = [...prev];
                                          const nextValue = !next[0];
                                          roomStaffTargetsFor(0).forEach((targetIdx) => {
                                            next[targetIdx] = nextValue;
                                          });
                                          return next;
                                        })
                                      }
                                    >
                                      <span className={`toggle-track${hasSecondaryRolesPerUnit[0] ? " is-on" : ""}`}>
                                        <span className="toggle-thumb"></span>
                                      </span>
                                      <span className="toggle-label">{hasSecondaryRolesPerUnit[0] ? "Yes" : "No"}</span>
                                    </button>
                                    {hasSecondaryRolesPerUnit[0] ? (
                                      <div className="secondary-role-block">
                                        <label className="form-label">
                                          What are the secondary staff roles across all units?
                                        </label>
                                        <div className="role-entry-list">
                                          {Array.from(
                                            { length: secondaryRoomStaffRoleEntriesPerUnit[0]?.length || 1 },
                                            (_, roleIdx) => (
                                              <div className="role-entry-row" key={`secondary-room-staff-role-shared-${roleIdx}`}>
                                                <input
                                                  className="form-input"
                                                  type="text"
                                                  value={secondaryRoomStaffRoleEntriesPerUnit[0]?.[roleIdx] || ""}
                                                  onChange={(e) =>
                                                    setSecondaryRoomStaffRoleEntriesPerUnit((prev) => {
                                                      const next = [...prev];
                                                      while (next.length < unitCount) next.push([""]);
                                                      roomStaffTargetsFor(0).forEach((targetIdx) => {
                                                        const unitRoles = [...(next[targetIdx] || [""])];
                                                        while (unitRoles.length <= roleIdx) unitRoles.push("");
                                                        unitRoles[roleIdx] = e.target.value;
                                                        next[targetIdx] = unitRoles;
                                                      });
                                                      return next;
                                                    })
                                                  }
                                                  placeholder={
                                                    roleIdx === 0
                                                      ? "e.g., Standby Scrub"
                                                      : roleIdx === 1
                                                        ? "e.g., Relief Support"
                                                        : "e.g., Optional role"
                                                  }
                                                />
                                                <div className="role-entry-actions">
                                                  <button
                                                    type="button"
                                                    className="icon-action-button"
                                                    aria-label="Add secondary staff role"
                                                    onClick={() =>
                                                      setSecondaryRoomStaffRoleEntriesPerUnit((prev) => {
                                                        const next = [...prev];
                                                        while (next.length < unitCount) next.push([""]);
                                                        roomStaffTargetsFor(0).forEach((targetIdx) => {
                                                          const unitRoles = [...(next[targetIdx] || [""])];
                                                          unitRoles.push("");
                                                          next[targetIdx] = unitRoles;
                                                        });
                                                        return next;
                                                      })
                                                    }
                                                  >
                                                    +
                                                  </button>
                                                  <button
                                                    type="button"
                                                    className="icon-action-button"
                                                    aria-label="Remove secondary staff role"
                                                    onClick={() =>
                                                      setSecondaryRoomStaffRoleEntriesPerUnit((prev) => {
                                                        const next = [...prev];
                                                        while (next.length < unitCount) next.push([""]);
                                                        roomStaffTargetsFor(0).forEach((targetIdx) => {
                                                          const unitRoles = [...(next[targetIdx] || [""])];
                                                          if (unitRoles.length > 1) unitRoles.splice(roleIdx, 1);
                                                          next[targetIdx] = unitRoles;
                                                        });
                                                        return next;
                                                      })
                                                    }
                                                    disabled={(secondaryRoomStaffRoleEntriesPerUnit[0]?.length || 1) <= 1}
                                                  >
                                                    -
                                                  </button>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    ) : null}
                                    <div className="slot-mapping-block">
                                      <label className="form-label">How should these roles be assigned to the template slots?</label>
                                      <div className="slot-mapping-grid">
                                        {Array.from({ length: 6 }, (_, slotIdx) => (
                                          <div className="slot-mapping-item" key={`room-staff-slot-shared-${slotIdx}`}>
                                            <label className="form-label">{`Slot ${slotIdx + 1}`}</label>
                                            <select
                                              className="form-input"
                                              value={roomStaffSlotAssignmentsPerUnit[0]?.[slotIdx] || ""}
                                              onChange={(e) =>
                                                setRoomStaffSlotAssignmentsPerUnit((prev) => {
                                                  const next = [...prev];
                                                  while (next.length < unitCount) next.push(["", "", "", "", "", ""]);
                                                  roomStaffTargetsFor(0).forEach((targetIdx) => {
                                                    const unitSlots = [...(next[targetIdx] || ["", "", "", "", "", ""])];
                                                    unitSlots[slotIdx] = e.target.value;
                                                    next[targetIdx] = unitSlots;
                                                  });
                                                  return next;
                                                })
                                              }
                                            >
                                              <option value="">Select role</option>
                                              <option value="Empty / On Standby">Empty / On Standby</option>
                                              {roomStaffRoleOptionsForUnit(0).map((role) => (
                                                <option key={`shared-${slotIdx}-${role}`} value={role}>
                                                  {role}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="unit-cards-grid">
                                    {Array.from({ length: unitCount }, (_, idx) => idx).map((i) => (
                                      <div className="form-row unit-config-card" key={`room-staff-${i}`}>
                                      <div className="panel-section-title">
                                        {`${roomLabelTerm(i)} Team`}
                                      </div>
                                      <label className="form-label form-label-with-hint">
                                        <span>
                                          What are the primary staff roles assigned to this unit?
                                        </span>
                                        <button
                                          type="button"
                                          className="info-badge-button"
                                          aria-label="Show primary staff roles help"
                                          aria-expanded={showPrimaryRoomStaffHint}
                                          onClick={() => setShowPrimaryRoomStaffHint((prev) => !prev)}
                                        >
                                          <span className="info-badge">i</span>
                                        </button>
                                      </label>
                                      {showPrimaryRoomStaffHint ? (
                                        <div className="field-hint">
                                          Enter the main day-to-day roles for this unit. These are the core roles you expect to appear by default.
                                        </div>
                                      ) : null}
                                      <div className="role-entry-list">
                                        {Array.from(
                                          { length: roomStaffRoleEntriesPerUnit[i]?.length || 1 },
                                          (_, roleIdx) => (
                                            <div className="role-entry-row" key={`room-staff-role-${i}-${roleIdx}`}>
                                              <input
                                                className="form-input"
                                                type="text"
                                                value={roomStaffRoleEntriesPerUnit[i]?.[roleIdx] || ""}
                                                onChange={(e) =>
                                                  setRoomStaffRoleEntriesPerUnit((prev) => {
                                                    const next = [...prev];
                                                    while (next.length < unitCount) next.push([""]);
                                                    roomStaffTargetsFor(i).forEach((targetIdx) => {
                                                      const unitRoles = [...(next[targetIdx] || [""])];
                                                      while (unitRoles.length <= roleIdx) unitRoles.push("");
                                                      unitRoles[roleIdx] = e.target.value;
                                                      next[targetIdx] = unitRoles;
                                                    });
                                                    return next;
                                                  })
                                                }
                                                placeholder={
                                                  roleIdx === 0
                                                    ? "e.g., Scrub Nurse"
                                                    : roleIdx === 1
                                                      ? "e.g., Scrub Practitioner"
                                                      : "e.g., Support"
                                                }
                                              />
                                              <div className="role-entry-actions">
                                                <button
                                                  type="button"
                                                  className="icon-action-button"
                                                  aria-label={`Add ${roomLabelTerm(i)} staff role`}
                                                  onClick={() =>
                                                    setRoomStaffRoleEntriesPerUnit((prev) => {
                                                      const next = [...prev];
                                                      while (next.length < unitCount) next.push([""]);
                                                      roomStaffTargetsFor(i).forEach((targetIdx) => {
                                                        const unitRoles = [...(next[targetIdx] || [""])];
                                                        unitRoles.push("");
                                                        next[targetIdx] = unitRoles;
                                                      });
                                                      return next;
                                                    })
                                                  }
                                                >
                                                  +
                                                </button>
                                                <button
                                                  type="button"
                                                  className="icon-action-button"
                                                  aria-label={`Remove ${roomLabelTerm(i)} staff role`}
                                                  onClick={() =>
                                                    setRoomStaffRoleEntriesPerUnit((prev) => {
                                                      const next = [...prev];
                                                      while (next.length < unitCount) next.push([""]);
                                                      roomStaffTargetsFor(i).forEach((targetIdx) => {
                                                        const unitRoles = [...(next[targetIdx] || [""])];
                                                        if (unitRoles.length > 1) unitRoles.splice(roleIdx, 1);
                                                        next[targetIdx] = unitRoles;
                                                      });
                                                      return next;
                                                    })
                                                  }
                                                  disabled={(roomStaffRoleEntriesPerUnit[i]?.length || 1) <= 1}
                                                >
                                                  −
                                                </button>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                      <label className="form-label form-label-with-hint">
                                        <span>Are there secondary roles?</span>
                                        <button
                                          type="button"
                                          className="info-badge-button"
                                          aria-label="Show secondary roles help"
                                          aria-expanded={showSecondaryRoomStaffHint}
                                          onClick={() => setShowSecondaryRoomStaffHint((prev) => !prev)}
                                        >
                                          <span className="info-badge">i</span>
                                        </button>
                                      </label>
                                      {showSecondaryRoomStaffHint ? (
                                        <div className="field-hint">
                                          Secondary roles can be optional, standby, or future roles that are not part of the default template setup.
                                        </div>
                                      ) : null}
                                      <button
                                        type="button"
                                        className="toggle"
                                        aria-pressed={Boolean(hasSecondaryRolesPerUnit[i])}
                                        onClick={() =>
                                          setHasSecondaryRolesPerUnit((prev) => {
                                            const next = [...prev];
                                            const nextValue = !next[i];
                                            roomStaffTargetsFor(i).forEach((targetIdx) => {
                                              next[targetIdx] = nextValue;
                                            });
                                            return next;
                                          })
                                        }
                                      >
                                        <span className={`toggle-track${hasSecondaryRolesPerUnit[i] ? " is-on" : ""}`}>
                                          <span className="toggle-thumb"></span>
                                        </span>
                                        <span className="toggle-label">{hasSecondaryRolesPerUnit[i] ? "Yes" : "No"}</span>
                                      </button>
                                      {hasSecondaryRolesPerUnit[i] ? (
                                        <div className="secondary-role-block">
                                          <label className="form-label">What are the secondary staff roles for this unit?</label>
                                          <div className="role-entry-list">
                                            {Array.from(
                                              { length: secondaryRoomStaffRoleEntriesPerUnit[i]?.length || 1 },
                                              (_, roleIdx) => (
                                                <div className="role-entry-row" key={`secondary-room-staff-role-${i}-${roleIdx}`}>
                                                  <input
                                                    className="form-input"
                                                    type="text"
                                                    value={secondaryRoomStaffRoleEntriesPerUnit[i]?.[roleIdx] || ""}
                                                    onChange={(e) =>
                                                      setSecondaryRoomStaffRoleEntriesPerUnit((prev) => {
                                                        const next = [...prev];
                                                        while (next.length < unitCount) next.push([""]);
                                                        roomStaffTargetsFor(i).forEach((targetIdx) => {
                                                          const unitRoles = [...(next[targetIdx] || [""])];
                                                          while (unitRoles.length <= roleIdx) unitRoles.push("");
                                                          unitRoles[roleIdx] = e.target.value;
                                                          next[targetIdx] = unitRoles;
                                                        });
                                                        return next;
                                                      })
                                                    }
                                                    placeholder={
                                                      roleIdx === 0
                                                        ? "e.g., Standby Scrub"
                                                        : roleIdx === 1
                                                          ? "e.g., Relief Support"
                                                          : "e.g., Optional role"
                                                    }
                                                  />
                                                  <div className="role-entry-actions">
                                                    <button
                                                      type="button"
                                                      className="icon-action-button"
                                                      aria-label={`Add secondary ${roomLabelTerm(i)} staff role`}
                                                      onClick={() =>
                                                        setSecondaryRoomStaffRoleEntriesPerUnit((prev) => {
                                                          const next = [...prev];
                                                          while (next.length < unitCount) next.push([""]);
                                                          roomStaffTargetsFor(i).forEach((targetIdx) => {
                                                            const unitRoles = [...(next[targetIdx] || [""])];
                                                            unitRoles.push("");
                                                            next[targetIdx] = unitRoles;
                                                          });
                                                          return next;
                                                        })
                                                      }
                                                    >
                                                      +
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="icon-action-button"
                                                      aria-label={`Remove secondary ${roomLabelTerm(i)} staff role`}
                                                      onClick={() =>
                                                        setSecondaryRoomStaffRoleEntriesPerUnit((prev) => {
                                                          const next = [...prev];
                                                          while (next.length < unitCount) next.push([""]);
                                                          roomStaffTargetsFor(i).forEach((targetIdx) => {
                                                            const unitRoles = [...(next[targetIdx] || [""])];
                                                            if (unitRoles.length > 1) unitRoles.splice(roleIdx, 1);
                                                            next[targetIdx] = unitRoles;
                                                          });
                                                          return next;
                                                        })
                                                      }
                                                      disabled={(secondaryRoomStaffRoleEntriesPerUnit[i]?.length || 1) <= 1}
                                                    >
                                                      −
                                                    </button>
                                                  </div>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      ) : null}
                                      <div className="slot-mapping-block">
                                        <label className="form-label">How should these roles be assigned to the template slots?</label>
                                        <div className="slot-mapping-grid">
                                          {Array.from({ length: 6 }, (_, slotIdx) => (
                                            <div className="slot-mapping-item" key={`room-staff-slot-${i}-${slotIdx}`}>
                                              <label className="form-label">{`Slot ${slotIdx + 1}`}</label>
                                              <select
                                                className="form-input"
                                                value={roomStaffSlotAssignmentsPerUnit[i]?.[slotIdx] || ""}
                                                onChange={(e) =>
                                                  setRoomStaffSlotAssignmentsPerUnit((prev) => {
                                                    const next = [...prev];
                                                    while (next.length < unitCount) next.push(["", "", "", "", "", ""]);
                                                    roomStaffTargetsFor(i).forEach((targetIdx) => {
                                                      const unitSlots = [...(next[targetIdx] || ["", "", "", "", "", ""])];
                                                      unitSlots[slotIdx] = e.target.value;
                                                      next[targetIdx] = unitSlots;
                                                    });
                                                    return next;
                                                  })
                                                }
                                              >
                                                <option value="">Select role</option>
                                                <option value="Empty / On Standby">Empty / On Standby</option>
                                                {roomStaffRoleOptionsForUnit(i).map((role) => (
                                                  <option key={`${i}-${slotIdx}-${role}`} value={role}>
                                                    {role}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </section>

                        <section className={`subsection-card${isRoleSubsectionOpen("auxiliaryStaff") ? " is-open" : ""}`}>
                          <button
                            type="button"
                            className="subsection-toggle"
                            onClick={() => toggleRoleSubsection("auxiliaryStaff")}
                            aria-expanded={isRoleSubsectionOpen("auxiliaryStaff")}
                          >
                            <span className="subsection-title">Auxiliary Staff</span>
                            <span className={`subsection-icon${isRoleSubsectionOpen("auxiliaryStaff") ? " is-open" : ""}`}>&gt;</span>
                          </button>
                          <div className={`subsection-body${isRoleSubsectionOpen("auxiliaryStaff") ? " is-open" : ""}`}>
                            <div className="subsection-inner">
                              <div className="form-grid">
                                <div className="form-row">
                                  <label className="form-label">What are the auxiliary staff groups?</label>
                                  <div className="role-entry-list">
                                    {Array.from({ length: auxiliaryStaffGroups.length || 1 }, (_, groupIdx) => (
                                      <div className="role-entry-row" key={`auxiliary-group-${groupIdx}`}>
                                        <input
                                          className="form-input"
                                          type="text"
                                          value={auxiliaryStaffGroups[groupIdx] || ""}
                                          onChange={(e) =>
                                            setAuxiliaryStaffGroups((prev) => {
                                              const next = [...prev];
                                              next[groupIdx] = e.target.value;
                                              return next;
                                            })
                                          }
                                          placeholder={
                                            groupIdx === 0
                                              ? "e.g., Management"
                                              : groupIdx === 1
                                                ? "e.g., Floater(s)"
                                                : "e.g., Unallocated"
                                          }
                                        />
                                        <div className="role-entry-actions">
                                          <button
                                            type="button"
                                            className="icon-action-button"
                                            aria-label="Add auxiliary staff group"
                                            onClick={() =>
                                              setAuxiliaryStaffGroups((prev) => [...prev, ""])
                                            }
                                          >
                                            +
                                          </button>
                                          <button
                                            type="button"
                                            className="icon-action-button"
                                            aria-label="Remove auxiliary staff group"
                                            onClick={() =>
                                              setAuxiliaryStaffGroups((prev) => {
                                                if (prev.length <= 1) return prev;
                                                const next = [...prev];
                                                next.splice(groupIdx, 1);
                                                return next;
                                              })
                                            }
                                            disabled={auxiliaryStaffGroups.length <= 1}
                                          >
                                            -
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="unit-cards-grid">
                                  {auxiliaryStaffGroups
                                    .map((group) => group.trim())
                                    .filter(Boolean)
                                    .map((group) => (
                                      <div className="form-row unit-config-card" key={`aux-group-card-${group}`}>
                                        <div className="panel-section-title">{group}</div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="panel-footer">
                <button
                  className="panel-nav-button"
                  type="button"
                  onClick={() => openPanelSection(Math.max(1, activeSection - 1))}
                  disabled={activeSection === 1}
                >
                  Back
                </button>
                <div className="panel-progress">{`Section ${activeSection} of 5`}</div>
                <button
                  className="panel-nav-button primary"
                  type="button"
                  onClick={() => openPanelSection(Math.min(5, activeSection + 1))}
                  disabled={activeSection === 5}
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
          </div>
        </aside>
        <section className="allocation-main">
          <div className="top-bar">
              <div className="top-bar-grid">
                <div className="title" style={{ textTransform: "uppercase" }}>
                  {departmentSiteName || "Department/Site Name"}
                </div>
                <div className="header-date">{formattedDayDate}</div>
              </div>
            <div className="controls no-print top-controls-inline">
              <details className="print-menu">
                <summary className="print-menu-summary">Print</summary>
                <div className="print-menu-panel">
                  <label className="print-menu-field">
                    <span>Size</span>
                    <select
                      className="form-input print-menu-select"
                      value={printPaper}
                      onChange={(e) => setPrintPaper(e.target.value as "A3" | "A4")}
                      aria-label="Print paper size"
                    >
                      <option value="A3">A3</option>
                      <option value="A4">A4</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    className="panel-nav-button print-menu-button"
                    onClick={() => window.print()}
                  >
                    Preview
                  </button>
                </div>
              </details>
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

          {pageStarts.map((pageStart) => renderSheetPage(pageStart))}
        </section>
      </div>
    </main>
  );
}
