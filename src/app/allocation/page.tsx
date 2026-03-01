"use client";

import type { CSSProperties, ReactElement } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight,
  Baseline, PaintBucket, ChevronDown, Pipette,
} from "lucide-react";

type SpecialtySelection = {
  specialty: string;
  subspecialty: string;
  sessionCount: string;
};

type OperationalPattern = {
  label: string;
  shortCode: string;
  startTime: string;
  endTime: string;
};

type SpecialtyTreeEntry = {
  specialty: string;
  abbreviation: string;
  subspecialties: string[];
};

type DescriptorEntry = {
  label: string;
  abbreviation: string;
  subEntries: string[];
};

type ThemeGroupKey =
  | "leadHeader"
  | "unitHeader"
  | "subunitLabel"
  | "specification"
  | "staffSlot"
  | "auxiliaryLabel"
  | "auxiliarySlot";

type ThemeGroupSettings = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: "normal" | "italic";
  textDecoration: "none" | "underline";
  textAlign: "left" | "center" | "right";
  fontColor: string;
  backgroundFill: string;
  lineColor: string;
  borderTop: boolean;
  borderRight: boolean;
  borderBottom: boolean;
  borderLeft: boolean;
  borderWidth: number;
};

export default function Home() {
  const emptySpecialtySelection = (): SpecialtySelection => ({
    specialty: "",
    subspecialty: "",
    sessionCount: "",
  });
  const [departmentSiteName, setDepartmentSiteName] = useState("");
  const [allocationDateFormat, setAllocationDateFormat] = useState("day-date");
  const [unitCount, setUnitCount] = useState(2);
  const [unitNames, setUnitNames] = useState(["Day Unit 1", "Day Unit 2"]);
  const [unitsPerUnit, setUnitsPerUnit] = useState([8, 8]);
  const [subunitLabelPerUnit, setSubunitLabelPerUnit] = useState(["Sub Unit", "Sub Unit"]);
  const [roomLabelMode, setRoomLabelMode] = useState<"number" | "letter">("number");
  const [roomStartPerUnit, setRoomStartPerUnit] = useState([1, 1]);
  const [specialtiesPerUnit, setSpecialtiesPerUnit] = useState<SpecialtySelection[][]>([
    Array.from({ length: 8 }, () => emptySpecialtySelection()),
    Array.from({ length: 8 }, () => emptySpecialtySelection()),
  ]);
  const [includeFunctionDescriptor, setIncludeFunctionDescriptor] = useState(false);
  const [specialtyCount, setSpecialtyCount] = useState(3);
  const [subspecialtyCountPerSpecialty, setSubspecialtyCountPerSpecialty] = useState([1, 1, 1]);
  const [functionEntries, setFunctionEntries] = useState<DescriptorEntry[]>([{ label: "", abbreviation: "", subEntries: [] }]);
  const [serviceEntries, setServiceEntries] = useState<DescriptorEntry[]>([{ label: "", abbreviation: "", subEntries: [] }]);
  const [specialtyTreeEntries, setSpecialtyTreeEntries] = useState<SpecialtyTreeEntry[]>([]);
  const [capabilityTagEntries, setCapabilityTagEntries] = useState<DescriptorEntry[]>([{ label: "", abbreviation: "", subEntries: [] }]);
  const [includeServiceDescriptor, setIncludeServiceDescriptor] = useState(false);
  const [includeSpecialtyDescriptor, setIncludeSpecialtyDescriptor] = useState(false);
  const [includeCapabilityTags, setIncludeCapabilityTags] = useState(false);
  const [operationalPatterns, setOperationalPatterns] = useState<OperationalPattern[]>([
    { label: "", shortCode: "", startTime: "08:00", endTime: "18:00" },
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
  const [specificationSelectionsPerUnit, setSpecificationSelectionsPerUnit] = useState([
    Array.from({ length: 8 }, () => ""),
    Array.from({ length: 8 }, () => ""),
  ]);
  const [operationalPatternSelectionsPerUnit, setOperationalPatternSelectionsPerUnit] = useState([
    Array.from({ length: 8 }, () => ""),
    Array.from({ length: 8 }, () => ""),
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
  const [activeSpecificationHelp, setActiveSpecificationHelp] = useState<"" | "function" | "service" | "specialty" | "capability">("");
  const [activeSpecificationEditor, setActiveSpecificationEditor] = useState<"" | "function" | "service" | "specialty" | "capability">("");
  const [showFunctionEditor, setShowFunctionEditor] = useState(false);
  const [showServiceEditor, setShowServiceEditor] = useState(false);
  const [showSpecialtyEditor, setShowSpecialtyEditor] = useState(false);
  const [showCapabilityEditor, setShowCapabilityEditor] = useState(false);
  const functionEditorRef = useRef<HTMLDivElement>(null);
  const serviceEditorRef = useRef<HTMLDivElement>(null);
  const specialtyEditorRef = useRef<HTMLDivElement>(null);
  const capabilityEditorRef = useRef<HTMLDivElement>(null);
  const [activeSpecialtyTab, setActiveSpecialtyTab] = useState(0);
  const [editingSpecialtyTab, setEditingSpecialtyTab] = useState<number | null>(null);
  const [editingSpecialtyValue, setEditingSpecialtyValue] = useState("");
  const [editingSpecialtyAbbreviation, setEditingSpecialtyAbbreviation] = useState("");
  const [editingSpecialtyOriginalValue, setEditingSpecialtyOriginalValue] = useState("");
  const [editingSpecialtyOriginalAbbreviation, setEditingSpecialtyOriginalAbbreviation] = useState("");
  const [activeFunctionTab, setActiveFunctionTab] = useState(0);
  const [editingFunctionTab, setEditingFunctionTab] = useState<number | null>(null);
  const [editingFunctionValue, setEditingFunctionValue] = useState("");
  const [editingFunctionAbbreviation, setEditingFunctionAbbreviation] = useState("");
  const [editingFunctionOriginalValue, setEditingFunctionOriginalValue] = useState("");
  const [editingFunctionOriginalAbbreviation, setEditingFunctionOriginalAbbreviation] = useState("");
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [editingServiceTab, setEditingServiceTab] = useState<number | null>(null);
  const [editingServiceValue, setEditingServiceValue] = useState("");
  const [editingServiceAbbreviation, setEditingServiceAbbreviation] = useState("");
  const [editingServiceOriginalValue, setEditingServiceOriginalValue] = useState("");
  const [editingServiceOriginalAbbreviation, setEditingServiceOriginalAbbreviation] = useState("");
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0);
  const [editingCapabilityTab, setEditingCapabilityTab] = useState<number | null>(null);
  const [editingCapabilityValue, setEditingCapabilityValue] = useState("");
  const [editingCapabilityAbbreviation, setEditingCapabilityAbbreviation] = useState("");
  const [editingCapabilityOriginalValue, setEditingCapabilityOriginalValue] = useState("");
  const [editingCapabilityOriginalAbbreviation, setEditingCapabilityOriginalAbbreviation] = useState("");
  const [roomStaffAppliesToAllUnits, setRoomStaffAppliesToAllUnits] = useState(true);
  const [auxiliaryStaffGroups, setAuxiliaryStaffGroups] = useState([""]);
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [printPaper, setPrintPaper] = useState<"A3" | "A4">("A3");
  const [openThemeColorPicker, setOpenThemeColorPicker] = useState<string | null>(null);
  const [pickerAnchorCoords, setPickerAnchorCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const [activeThemeTargets, setActiveThemeTargets] = useState<ThemeGroupKey[]>(["leadHeader"]);
  const [tableTheme, setTableTheme] = useState<Record<ThemeGroupKey, ThemeGroupSettings>>({
    leadHeader:    { fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 800, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0ea5e9", backgroundFill: "#d6ebff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
    unitHeader:    { fontFamily: "Manrope, sans-serif", fontSize: 25, fontWeight: 800, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0ea5e9", backgroundFill: "#e8f3ff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
    subunitLabel:  { fontFamily: "Manrope, sans-serif", fontSize: 22, fontWeight: 800, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0a2b52", backgroundFill: "#dbeafe", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
    specification: { fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0a2b52", backgroundFill: "#ffffff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
    staffSlot:     { fontFamily: "Manrope, sans-serif", fontSize: 20, fontWeight: 500, fontStyle: "normal", textDecoration: "none", textAlign: "left",   fontColor: "#6f87a1", backgroundFill: "#ffffff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
    auxiliaryLabel:{ fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 800, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0a2b52", backgroundFill: "#cde5ff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
    auxiliarySlot: { fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 400, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#6f87a1", backgroundFill: "#ffffff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
  });
  // ── Template save / load ──────────────────────────────────────────────────
  const [templateModal, setTemplateModal] = useState<null | "save" | "open">(null);
  const [saveAsName, setSaveAsName] = useState("");
  const [currentTemplateName, setCurrentTemplateName] = useState<string | null>(null);

  const STORAGE_KEY = "tomroster_templates";

  type SavedTemplate = {
    id: string;
    name: string;
    savedAt: string;
    state: Record<string, unknown>;
  };

  const loadTemplateList = (): SavedTemplate[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as SavedTemplate[];
    } catch {
      return [];
    }
  };

  const captureState = (): Record<string, unknown> => ({
    departmentSiteName, allocationDateFormat,
    unitCount, unitNames, unitsPerUnit, subunitLabelPerUnit,
    roomLabelMode, roomStartPerUnit, specialtiesPerUnit,
    includeFunctionDescriptor, specialtyCount, subspecialtyCountPerSpecialty,
    functionEntries, serviceEntries, specialtyTreeEntries, capabilityTagEntries,
    includeServiceDescriptor, includeSpecialtyDescriptor, includeCapabilityTags,
    operationalPatterns, subunitsPerUnit, satelliteUnits, leadRoleLabel,
    contactPreferencePerUnit, coordinatorsPerUnit, coordinatorLabelsPerUnit,
    leadHasContactPerUnit, leadContactValuePerUnit,
    roomStaffRoleEntriesPerUnit, hasSecondaryRolesPerUnit, secondaryRoomStaffRoleEntriesPerUnit,
    roomStaffSlotAssignmentsPerUnit, roomStaffCountPerUnit, roomStaffDisplayPreferencePerUnit,
    roomStaffLabelsPerUnit, roomStaffHasContactPerUnit, roomStaffContactValuePerUnit,
    specificationSelectionsPerUnit, operationalPatternSelectionsPerUnit,
    hasNightUnit, hasSatelliteUnit, auxiliaryStaffGroups, roomStaffAppliesToAllUnits,
    printPaper, tableTheme,
  });

  const applyState = (s: Record<string, unknown>) => {
    const g = <T,>(k: string, fallback: T): T => (k in s ? (s[k] as T) : fallback);
    setDepartmentSiteName(g("departmentSiteName", ""));
    setAllocationDateFormat(g("allocationDateFormat", "day-date"));
    setUnitCount(g("unitCount", 2));
    setUnitNames(g("unitNames", ["Day Unit 1", "Day Unit 2"]));
    setUnitsPerUnit(g("unitsPerUnit", [8, 8]));
    setSubunitLabelPerUnit(g("subunitLabelPerUnit", ["Sub Unit", "Sub Unit"]));
    setRoomLabelMode(g("roomLabelMode", "number"));
    setRoomStartPerUnit(g("roomStartPerUnit", [1, 1]));
    setSpecialtiesPerUnit(g("specialtiesPerUnit", []));
    setIncludeFunctionDescriptor(g("includeFunctionDescriptor", false));
    setSpecialtyCount(g("specialtyCount", 3));
    setSubspecialtyCountPerSpecialty(g("subspecialtyCountPerSpecialty", [1, 1, 1]));
    const normalizeDescriptorEntries = (entries: Array<DescriptorEntry | string> | unknown): DescriptorEntry[] => {
      if (!Array.isArray(entries) || entries.length === 0) return [{ label: "", abbreviation: "", subEntries: [] }];
      const normalized = entries.map((entry) => {
        if (typeof entry === "string") return { label: entry, abbreviation: "", subEntries: [] };
        if (entry && typeof entry === "object") {
          const item = entry as Partial<DescriptorEntry>;
          return {
            label: item.label || "",
            abbreviation: item.abbreviation || "",
            subEntries: Array.isArray(item.subEntries) ? item.subEntries : [],
          };
        }
        return { label: "", abbreviation: "", subEntries: [] };
      });
      return normalized.length > 0 ? normalized : [{ label: "", abbreviation: "", subEntries: [] }];
    };
    setFunctionEntries(normalizeDescriptorEntries(g("functionEntries", [{ label: "", abbreviation: "", subEntries: [] }] as Array<DescriptorEntry | string>)));
    setServiceEntries(normalizeDescriptorEntries(g("serviceEntries", [{ label: "", abbreviation: "", subEntries: [] }] as Array<DescriptorEntry | string>)));
    const savedSpecialtyTree = g("specialtyTreeEntries", [] as SpecialtyTreeEntry[]);
    if (Array.isArray(savedSpecialtyTree) && savedSpecialtyTree.length > 0) {
      setSpecialtyTreeEntries(
        savedSpecialtyTree.map((entry) => ({
          specialty: entry?.specialty || "",
          abbreviation: entry?.abbreviation || "",
          subspecialties:
            Array.isArray(entry?.subspecialties) && entry.subspecialties.length > 0
              ? entry.subspecialties
              : [""],
        }))
      );
    } else {
      const legacySpecialties = g("specialtyEntries", g("specialtyDescriptorEntries", [""] as string[]));
      const legacySubspecialties = g("subspecialtyEntries", [""] as string[]);
      const seededSpecialties = Array.isArray(legacySpecialties) && legacySpecialties.length > 0 ? legacySpecialties : [""];
      const seededSubspecialties =
        Array.isArray(legacySubspecialties) && legacySubspecialties.length > 0 ? legacySubspecialties : [""];
      setSpecialtyTreeEntries(
        seededSpecialties
          .map((specialty) => ({
            specialty: specialty || "",
            abbreviation: "",
            subspecialties: [...seededSubspecialties],
          }))
          .filter((entry) => entry.specialty.trim())
      );
    }
    setCapabilityTagEntries(normalizeDescriptorEntries(g("capabilityTagEntries", [{ label: "", abbreviation: "", subEntries: [] }] as Array<DescriptorEntry | string>)));
    setIncludeServiceDescriptor(g("includeServiceDescriptor", false));
    setIncludeSpecialtyDescriptor(g("includeSpecialtyDescriptor", false));
    setIncludeCapabilityTags(g("includeCapabilityTags", false));
    setOperationalPatterns(g("operationalPatterns", [{ label: "", shortCode: "", startTime: "08:00", endTime: "18:00" }]));
    setSubunitsPerUnit(g("subunitsPerUnit", 8));
    setSatelliteUnits(g("satelliteUnits", "Satellite Day Unit"));
    setLeadRoleLabel(g("leadRoleLabel", ""));
    setContactPreferencePerUnit(g("contactPreferencePerUnit", ["label", "label"]));
    setCoordinatorsPerUnit(g("coordinatorsPerUnit", [2, 1]));
    setCoordinatorLabelsPerUnit(g("coordinatorLabelsPerUnit", [["", ""], ["", ""]]));
    setLeadHasContactPerUnit(g("leadHasContactPerUnit", [[false, false], [false, false]]));
    setLeadContactValuePerUnit(g("leadContactValuePerUnit", [["", ""], ["", ""]]));
    setRoomStaffRoleEntriesPerUnit(g("roomStaffRoleEntriesPerUnit", [[""], [""]]));
    setHasSecondaryRolesPerUnit(g("hasSecondaryRolesPerUnit", [false, false]));
    setSecondaryRoomStaffRoleEntriesPerUnit(g("secondaryRoomStaffRoleEntriesPerUnit", [[""], [""]]));
    setRoomStaffSlotAssignmentsPerUnit(g("roomStaffSlotAssignmentsPerUnit", [["", "", "", "", "", ""], ["", "", "", "", "", ""]]));
    setRoomStaffCountPerUnit(g("roomStaffCountPerUnit", [2, 2]));
    setRoomStaffDisplayPreferencePerUnit(g("roomStaffDisplayPreferencePerUnit", ["label", "label"]));
    setRoomStaffLabelsPerUnit(g("roomStaffLabelsPerUnit", [["", ""], ["", ""]]));
    setRoomStaffHasContactPerUnit(g("roomStaffHasContactPerUnit", [[false, false], [false, false]]));
    setRoomStaffContactValuePerUnit(g("roomStaffContactValuePerUnit", [["", ""], ["", ""]]));
    setSpecificationSelectionsPerUnit(g("specificationSelectionsPerUnit", []));
    setOperationalPatternSelectionsPerUnit(g("operationalPatternSelectionsPerUnit", []));
    setHasNightUnit(g("hasNightUnit", false));
    setHasSatelliteUnit(g("hasSatelliteUnit", false));
    setAuxiliaryStaffGroups(g("auxiliaryStaffGroups", [""]));
    setRoomStaffAppliesToAllUnits(g("roomStaffAppliesToAllUnits", true));
    setPrintPaper(g("printPaper", "A3"));
    setTableTheme(g("tableTheme", {} as Record<ThemeGroupKey, ThemeGroupSettings>));
  };

  const saveTemplate = (name: string) => {
    const list = loadTemplateList();
    const existing = list.findIndex((t) => t.name === name);
    const entry: SavedTemplate = {
      id: existing >= 0 ? list[existing].id : `tpl_${Date.now()}`,
      name,
      savedAt: new Date().toISOString(),
      state: captureState(),
    };
    if (existing >= 0) list[existing] = entry;
    else list.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setCurrentTemplateName(name);
  };

  const deleteTemplate = (id: string) => {
    const list = loadTemplateList().filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const handleSave = () => {
    if (currentTemplateName) {
      saveTemplate(currentTemplateName);
    } else {
      setSaveAsName("");
      setTemplateModal("save");
    }
  };

  const handleSaveAs = () => {
    setSaveAsName(currentTemplateName ?? "");
    setTemplateModal("save");
  };

  const handleNew = () => {
    setTableTheme({
      leadHeader:    { fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 800, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0ea5e9", backgroundFill: "#d6ebff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
      unitHeader:    { fontFamily: "Manrope, sans-serif", fontSize: 25, fontWeight: 800, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0ea5e9", backgroundFill: "#e8f3ff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
      subunitLabel:  { fontFamily: "Manrope, sans-serif", fontSize: 22, fontWeight: 800, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0a2b52", backgroundFill: "#dbeafe", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
      specification: { fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0a2b52", backgroundFill: "#ffffff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
      staffSlot:     { fontFamily: "Manrope, sans-serif", fontSize: 20, fontWeight: 500, fontStyle: "normal", textDecoration: "none", textAlign: "left",   fontColor: "#6f87a1", backgroundFill: "#ffffff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
      auxiliaryLabel:{ fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 800, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#0a2b52", backgroundFill: "#cde5ff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
      auxiliarySlot: { fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 400, fontStyle: "normal", textDecoration: "none", textAlign: "center", fontColor: "#6f87a1", backgroundFill: "#ffffff", lineColor: "#7fa6d1", borderTop: true, borderRight: true, borderBottom: true, borderLeft: true, borderWidth: 2 },
    });
    setCurrentTemplateName(null);
  };

  const handleSaveConfirm = () => {
    const name = saveAsName.trim();
    if (!name) return;
    saveTemplate(name);
    setTemplateModal(null);
  };

  const handleLoad = (tpl: SavedTemplate) => {
    applyState(tpl.state);
    setCurrentTemplateName(tpl.name);
    setTemplateModal(null);
  };
  // ─────────────────────────────────────────────────────────────────────────

  const unitNamesArr = useMemo(() => {
    const base = Array.from({ length: unitCount }, (_, i) => unitNames[i] || `Unit ${i + 1}`);
    return base;
  }, [unitCount, unitNames]);
  const satelliteLabel = satelliteUnits || "Satellite Day Unit";
  const unitLeadTerm = leadRoleLabel.trim() || "Unit Lead";
  const unitLeadPlural = unitLeadTerm.endsWith("s") ? unitLeadTerm : `${unitLeadTerm}s`;
  const themeGroups: Array<{ key: ThemeGroupKey; label: string }> = [
    { key: "leadHeader", label: "Unit Lead Headers" },
    { key: "unitHeader", label: "Unit Headers" },
    { key: "subunitLabel", label: "Sub Unit Labels" },
    { key: "specification", label: "Specification Block" },
    { key: "staffSlot", label: "Staff Slots" },
    { key: "auxiliaryLabel", label: "Auxiliary Labels" },
    { key: "auxiliarySlot", label: "Auxiliary Slots" },
  ];
  const themeSwatches = [
    "#ffffff",
    "#f8fafc",
    "#e8f3ff",
    "#dbeafe",
    "#cde5ff",
    "#0ea5e9",
    "#0a2b52",
    "#6f87a1",
    "#7fa6d1",
    "#dc2626",
    "#16a34a",
    "#d97706",
  ];
  const themeSizeOptions = [10, 11, 12, 13, 14, 16, 17, 18, 20, 22, 24, 25, 28, 32];
  const activeThemeSettings = tableTheme[activeThemeTargets[0] || "leadHeader"];
  const hasEyeDropper = typeof window !== "undefined" && "EyeDropper" in window;
  const applyThemeToTargets = (updater: (current: ThemeGroupSettings) => ThemeGroupSettings) => {
    setTableTheme((prev) => {
      const next = { ...prev };
      activeThemeTargets.forEach((key) => {
        next[key] = updater(prev[key]);
      });
      return next;
    });
  };
  const pickScreenColor = async (field: "fontColor" | "backgroundFill" | "lineColor") => {
    const pickerApi = (window as Window & { EyeDropper?: { new (): { open: () => Promise<{ sRGBHex: string }> } } }).EyeDropper;
    if (!pickerApi) return;
    try {
      const picker = new pickerApi();
      const result = await picker.open();
      applyThemeToTargets((current) => ({ ...current, [field]: result.sRGBHex }));
    } catch {
      // User cancelled or browser blocked the picker; no state change needed.
    }
  };
  const openThemePopoverAt = (anchorEl: HTMLElement, pickerKey: string) => {
    const rect = anchorEl.getBoundingClientRect();
    const isBorder = pickerKey === "toolbar-border";
    const popoverWidth = isBorder ? 236 : 182;
    const popoverHeight = isBorder ? 360 : 172;
    const margin = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const panelEl = anchorEl.closest(".left-panel") as HTMLElement | null;

    let left = rect.left;
    let top = rect.bottom + 6;

    const minLeft = panelEl ? panelEl.getBoundingClientRect().left + margin : margin;
    const maxLeftInPanel = panelEl
      ? panelEl.getBoundingClientRect().right - popoverWidth - margin
      : viewportWidth - popoverWidth - margin;
    const maxLeftInViewport = viewportWidth - popoverWidth - margin;
    const maxLeft = Math.min(maxLeftInPanel, maxLeftInViewport);
    left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));

    if (top + popoverHeight > viewportHeight - margin) {
      top = Math.max(margin, rect.top - popoverHeight - 6);
    }

    setPickerAnchorCoords({ top, left });
    setOpenThemeColorPicker(pickerKey);
  };

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

  const roomLabelTerm = (unitIdx: number) => subunitLabelPerUnit[unitIdx] || "Sub Unit";
  const specialtyCatalog = useMemo(() => {
    const catalog: Record<string, string[]> = {};
    for (let i = 0; i < specialtyCount; i += 1) {
      const specialtyKey = `Specification ${indexToLetters(i + 1)}`;
      const subspecialtyCount = Math.max(0, subspecialtyCountPerSpecialty[i] || 0);
      catalog[specialtyKey] = Array.from(
        { length: subspecialtyCount },
        (_, subIdx) => `Specification ${indexToLetters(i + 1)}.${subIdx + 1}`
      );
    }
    return catalog;
  }, [specialtyCount, subspecialtyCountPerSpecialty]);
  const roomStaffSectionLabel = useMemo(() => {
    const activeLabels = subunitLabelPerUnit
      .slice(0, unitCount)
      .map((label) => label.trim() || "Room");
    if (activeLabels.length === 0) return "Sub Unit Staff";
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
    if (activeLabels.length === 0) return "Sub Unit";
    const uniqueLabels = Array.from(new Set(activeLabels));
    return uniqueLabels.join("/");
  }, [subunitLabelPerUnit, unitCount]);
  const roomStaffTargetsFor = (unitIdx: number) =>
    roomStaffAppliesToAllUnits ? Array.from({ length: unitCount }, (_, idx) => idx) : [unitIdx];
  const roomLabel = (unitIdx: number, _unitLabel: string, roomNum: number) =>
    `${roomLabelTerm(unitIdx)} ${roomTokenForUnit(unitIdx, roomNum)}`;
  const allocationThemeVars = useMemo(() => {
    const bv = (on: boolean, color: string, w: number) =>
      on ? `${w}px solid ${color}` : "none";
    return ({
      "--theme-lead-header-font-family": tableTheme.leadHeader.fontFamily,
      "--theme-lead-header-font-size": `${tableTheme.leadHeader.fontSize}px`,
      "--theme-lead-header-font-weight": `${tableTheme.leadHeader.fontWeight}`,
      "--theme-lead-header-font-style": tableTheme.leadHeader.fontStyle,
      "--theme-lead-header-text-decoration": tableTheme.leadHeader.textDecoration,
      "--theme-lead-header-text-align": tableTheme.leadHeader.textAlign,
      "--theme-lead-header-font-color": tableTheme.leadHeader.fontColor,
      "--theme-lead-header-fill": tableTheme.leadHeader.backgroundFill,
      "--theme-lead-header-border-top":    bv(tableTheme.leadHeader.borderTop,    tableTheme.leadHeader.lineColor, tableTheme.leadHeader.borderWidth),
      "--theme-lead-header-border-right":  bv(tableTheme.leadHeader.borderRight,  tableTheme.leadHeader.lineColor, tableTheme.leadHeader.borderWidth),
      "--theme-lead-header-border-bottom": bv(tableTheme.leadHeader.borderBottom, tableTheme.leadHeader.lineColor, tableTheme.leadHeader.borderWidth),
      "--theme-lead-header-border-left":   bv(tableTheme.leadHeader.borderLeft,   tableTheme.leadHeader.lineColor, tableTheme.leadHeader.borderWidth),
      "--theme-unit-header-font-family": tableTheme.unitHeader.fontFamily,
      "--theme-unit-header-font-size": `${tableTheme.unitHeader.fontSize}px`,
      "--theme-unit-header-font-weight": `${tableTheme.unitHeader.fontWeight}`,
      "--theme-unit-header-font-style": tableTheme.unitHeader.fontStyle,
      "--theme-unit-header-text-decoration": tableTheme.unitHeader.textDecoration,
      "--theme-unit-header-text-align": tableTheme.unitHeader.textAlign,
      "--theme-unit-header-font-color": tableTheme.unitHeader.fontColor,
      "--theme-unit-header-fill": tableTheme.unitHeader.backgroundFill,
      "--theme-unit-header-border-top":    bv(tableTheme.unitHeader.borderTop,    tableTheme.unitHeader.lineColor, tableTheme.unitHeader.borderWidth),
      "--theme-unit-header-border-right":  bv(tableTheme.unitHeader.borderRight,  tableTheme.unitHeader.lineColor, tableTheme.unitHeader.borderWidth),
      "--theme-unit-header-border-bottom": bv(tableTheme.unitHeader.borderBottom, tableTheme.unitHeader.lineColor, tableTheme.unitHeader.borderWidth),
      "--theme-unit-header-border-left":   bv(tableTheme.unitHeader.borderLeft,   tableTheme.unitHeader.lineColor, tableTheme.unitHeader.borderWidth),
      "--theme-subunit-label-font-family": tableTheme.subunitLabel.fontFamily,
      "--theme-subunit-label-font-size": `${tableTheme.subunitLabel.fontSize}px`,
      "--theme-subunit-label-font-weight": `${tableTheme.subunitLabel.fontWeight}`,
      "--theme-subunit-label-font-style": tableTheme.subunitLabel.fontStyle,
      "--theme-subunit-label-text-decoration": tableTheme.subunitLabel.textDecoration,
      "--theme-subunit-label-text-align": tableTheme.subunitLabel.textAlign,
      "--theme-subunit-label-font-color": tableTheme.subunitLabel.fontColor,
      "--theme-subunit-label-fill": tableTheme.subunitLabel.backgroundFill,
      "--theme-subunit-label-border-top":    bv(tableTheme.subunitLabel.borderTop,    tableTheme.subunitLabel.lineColor, tableTheme.subunitLabel.borderWidth),
      "--theme-subunit-label-border-right":  bv(tableTheme.subunitLabel.borderRight,  tableTheme.subunitLabel.lineColor, tableTheme.subunitLabel.borderWidth),
      "--theme-subunit-label-border-bottom": bv(tableTheme.subunitLabel.borderBottom, tableTheme.subunitLabel.lineColor, tableTheme.subunitLabel.borderWidth),
      "--theme-subunit-label-border-left":   bv(tableTheme.subunitLabel.borderLeft,   tableTheme.subunitLabel.lineColor, tableTheme.subunitLabel.borderWidth),
      "--theme-specification-font-family": tableTheme.specification.fontFamily,
      "--theme-specification-font-size": `${tableTheme.specification.fontSize}px`,
      "--theme-specification-font-weight": `${tableTheme.specification.fontWeight}`,
      "--theme-specification-font-style": tableTheme.specification.fontStyle,
      "--theme-specification-text-decoration": tableTheme.specification.textDecoration,
      "--theme-specification-text-align": tableTheme.specification.textAlign,
      "--theme-specification-font-color": tableTheme.specification.fontColor,
      "--theme-specification-fill": tableTheme.specification.backgroundFill,
      "--theme-specification-border-top":    bv(tableTheme.specification.borderTop,    tableTheme.specification.lineColor, tableTheme.specification.borderWidth),
      "--theme-specification-border-right":  bv(tableTheme.specification.borderRight,  tableTheme.specification.lineColor, tableTheme.specification.borderWidth),
      "--theme-specification-border-bottom": bv(tableTheme.specification.borderBottom, tableTheme.specification.lineColor, tableTheme.specification.borderWidth),
      "--theme-specification-border-left":   bv(tableTheme.specification.borderLeft,   tableTheme.specification.lineColor, tableTheme.specification.borderWidth),
      "--theme-staff-slot-font-family": tableTheme.staffSlot.fontFamily,
      "--theme-staff-slot-font-size": `${tableTheme.staffSlot.fontSize}px`,
      "--theme-staff-slot-font-weight": `${tableTheme.staffSlot.fontWeight}`,
      "--theme-staff-slot-font-style": tableTheme.staffSlot.fontStyle,
      "--theme-staff-slot-text-decoration": tableTheme.staffSlot.textDecoration,
      "--theme-staff-slot-text-align": tableTheme.staffSlot.textAlign,
      "--theme-staff-slot-font-color": tableTheme.staffSlot.fontColor,
      "--theme-staff-slot-fill": tableTheme.staffSlot.backgroundFill,
      "--theme-staff-slot-border-top":    bv(tableTheme.staffSlot.borderTop,    tableTheme.staffSlot.lineColor, tableTheme.staffSlot.borderWidth),
      "--theme-staff-slot-border-right":  bv(tableTheme.staffSlot.borderRight,  tableTheme.staffSlot.lineColor, tableTheme.staffSlot.borderWidth),
      "--theme-staff-slot-border-bottom": bv(tableTheme.staffSlot.borderBottom, tableTheme.staffSlot.lineColor, tableTheme.staffSlot.borderWidth),
      "--theme-staff-slot-border-left":   bv(tableTheme.staffSlot.borderLeft,   tableTheme.staffSlot.lineColor, tableTheme.staffSlot.borderWidth),
      "--theme-aux-label-font-family": tableTheme.auxiliaryLabel.fontFamily,
      "--theme-aux-label-font-size": `${tableTheme.auxiliaryLabel.fontSize}px`,
      "--theme-aux-label-font-weight": `${tableTheme.auxiliaryLabel.fontWeight}`,
      "--theme-aux-label-font-style": tableTheme.auxiliaryLabel.fontStyle,
      "--theme-aux-label-text-decoration": tableTheme.auxiliaryLabel.textDecoration,
      "--theme-aux-label-text-align": tableTheme.auxiliaryLabel.textAlign,
      "--theme-aux-label-font-color": tableTheme.auxiliaryLabel.fontColor,
      "--theme-aux-label-fill": tableTheme.auxiliaryLabel.backgroundFill,
      "--theme-aux-label-border-top":    bv(tableTheme.auxiliaryLabel.borderTop,    tableTheme.auxiliaryLabel.lineColor, tableTheme.auxiliaryLabel.borderWidth),
      "--theme-aux-label-border-right":  bv(tableTheme.auxiliaryLabel.borderRight,  tableTheme.auxiliaryLabel.lineColor, tableTheme.auxiliaryLabel.borderWidth),
      "--theme-aux-label-border-bottom": bv(tableTheme.auxiliaryLabel.borderBottom, tableTheme.auxiliaryLabel.lineColor, tableTheme.auxiliaryLabel.borderWidth),
      "--theme-aux-label-border-left":   bv(tableTheme.auxiliaryLabel.borderLeft,   tableTheme.auxiliaryLabel.lineColor, tableTheme.auxiliaryLabel.borderWidth),
      "--theme-aux-slot-font-family": tableTheme.auxiliarySlot.fontFamily,
      "--theme-aux-slot-font-size": `${tableTheme.auxiliarySlot.fontSize}px`,
      "--theme-aux-slot-font-weight": `${tableTheme.auxiliarySlot.fontWeight}`,
      "--theme-aux-slot-font-style": tableTheme.auxiliarySlot.fontStyle,
      "--theme-aux-slot-text-decoration": tableTheme.auxiliarySlot.textDecoration,
      "--theme-aux-slot-text-align": tableTheme.auxiliarySlot.textAlign,
      "--theme-aux-slot-font-color": tableTheme.auxiliarySlot.fontColor,
      "--theme-aux-slot-fill": tableTheme.auxiliarySlot.backgroundFill,
      "--theme-aux-slot-border-top":    bv(tableTheme.auxiliarySlot.borderTop,    tableTheme.auxiliarySlot.lineColor, tableTheme.auxiliarySlot.borderWidth),
      "--theme-aux-slot-border-right":  bv(tableTheme.auxiliarySlot.borderRight,  tableTheme.auxiliarySlot.lineColor, tableTheme.auxiliarySlot.borderWidth),
      "--theme-aux-slot-border-bottom": bv(tableTheme.auxiliarySlot.borderBottom, tableTheme.auxiliarySlot.lineColor, tableTheme.auxiliarySlot.borderWidth),
      "--theme-aux-slot-border-left":   bv(tableTheme.auxiliarySlot.borderLeft,   tableTheme.auxiliarySlot.lineColor, tableTheme.auxiliarySlot.borderWidth),
    }) as CSSProperties;
  }, [tableTheme]);
  const sessionCountLabel = (value: string) => {
    if (value === "x1") return "x 1";
    if (value === "x2") return "x 2";
    if (value === "x3") return "x 3";
    return "";
  };
  const specificationValueForUnitRoom = (unitIdx: number, roomNum: number) =>
    specificationSelectionsPerUnit[unitIdx]?.[roomNum - 1] || "";
  const operationalPatternValueForUnitRoom = (unitIdx: number, roomNum: number) =>
    operationalPatternSelectionsPerUnit[unitIdx]?.[roomNum - 1] || "";
  const setOperationalPatternValueForUnitRoom = (unitIdx: number, roomNum: number, value: string) => {
    setOperationalPatternSelectionsPerUnit((prev) => {
      const next = [...prev];
      while (next.length < unitCount) next.push(Array.from({ length: 8 }, () => ""));
      const unitSelections = [...(next[unitIdx] || [])];
      const unitRooms = unitsPerUnit[unitIdx] || 8;
      while (unitSelections.length < unitRooms) unitSelections.push("");
      unitSelections[roomNum - 1] = value;
      next[unitIdx] = unitSelections;
      return next;
    });
  };

  const formattedDayDate = useMemo(() => {
    if (allocationDateFormat === "day-date") return "DAY/DATE";
    if (allocationDateFormat === "weekday-slash") return "MONDAY, 23/02/2026";
    if (allocationDateFormat === "weekday-long") return "MONDAY 23 FEBRUARY 2026";
    if (allocationDateFormat === "slash") return "23/02/2026";
    if (allocationDateFormat === "short-month") return "23 FEB 2026";
    return "DAY/DATE";
  }, [allocationDateFormat]);
type SpecificationOptionGroup = {
    label: string;
    options: string[];
  };
  const specificationOptionGroups = useMemo<SpecificationOptionGroup[]>(
    () => {
      const groups: SpecificationOptionGroup[] = [];

      if (includeFunctionDescriptor) {
        const options = functionEntries
          .flatMap((entry) => {
            const label = entry.label.trim();
            if (!label) return [];
            const abbreviation = entry.abbreviation.trim();
            const prefix = abbreviation || label;
            const subEntries = (entry.subEntries || []).map((sub) => sub.trim()).filter(Boolean);
            if (subEntries.length === 0) return [label];
            return subEntries.map((sub) => `${prefix}/${sub}`);
          })
          .filter(Boolean);
        if (options.length > 0) groups.push({ label: "Function", options });
      }

      if (includeServiceDescriptor) {
        const options = serviceEntries
          .flatMap((entry) => {
            const label = entry.label.trim();
            if (!label) return [];
            const abbreviation = entry.abbreviation.trim();
            const prefix = abbreviation || label;
            const subEntries = (entry.subEntries || []).map((sub) => sub.trim()).filter(Boolean);
            if (subEntries.length === 0) return [label];
            return subEntries.map((sub) => `${prefix}/${sub}`);
          })
          .filter(Boolean);
        if (options.length > 0) groups.push({ label: "Service", options });
      }

      if (includeSpecialtyDescriptor) {
        const options = specialtyTreeEntries.flatMap((entry) => {
          const specialty = entry.specialty.trim();
          const abbreviation = entry.abbreviation.trim();
          const subspecialties = (entry.subspecialties || []).map((sub) => sub.trim()).filter(Boolean);
          if (!specialty) return [];
          if (subspecialties.length === 0) return [specialty];
          const prefix = abbreviation || specialty;
          return subspecialties.map((subspecialty) => `${prefix}/${subspecialty}`);
        });

        if (options.length > 0) {
          groups.push({
            label: "Specialty",
            options,
          });
        }
      }

      if (includeCapabilityTags) {
        const options = capabilityTagEntries
          .flatMap((entry) => {
            const label = entry.label.trim();
            if (!label) return [];
            const abbreviation = entry.abbreviation.trim();
            const prefix = abbreviation || label;
            const subEntries = (entry.subEntries || []).map((sub) => sub.trim()).filter(Boolean);
            if (subEntries.length === 0) return [label];
            return subEntries.map((sub) => `${prefix}/${sub}`);
          })
          .filter(Boolean);
        if (options.length > 0) groups.push({ label: "Capability Tags", options });
      }

      return groups;
    },
    [
      capabilityTagEntries,
      functionEntries,
      includeCapabilityTags,
      includeFunctionDescriptor,
      includeServiceDescriptor,
      includeSpecialtyDescriptor,
      serviceEntries,
      specialtyTreeEntries,
    ]
  );
  const operationalPatternOptions = useMemo(
    () =>
      operationalPatterns
        .map((pattern) => ({
          label: pattern.label.trim(),
          shortCode: pattern.shortCode.trim().toUpperCase(),
          startTime: pattern.startTime,
          endTime: pattern.endTime,
        }))
        .filter((pattern) => pattern.shortCode),
    [operationalPatterns]
  );

  useEffect(() => {
    setOperationalPatternSelectionsPerUnit((prev) =>
      Array.from({ length: unitCount }, (_, unitIdx) => {
        const existing = prev[unitIdx] || [];
        const roomCount = unitsPerUnit[unitIdx] || 8;
        return Array.from({ length: roomCount }, (_, roomIdx) => existing[roomIdx] || "");
      })
    );
  }, [unitCount, unitsPerUnit]);

  useEffect(() => {
    setActiveSpecialtyTab((prev) =>
      Math.min(prev, Math.max(0, specialtyTreeEntries.length - 1))
    );
  }, [specialtyTreeEntries.length]);

  useEffect(() => {
    setActiveFunctionTab((prev) =>
      Math.min(prev, Math.max(0, functionEntries.length - 1))
    );
  }, [functionEntries.length]);

  useEffect(() => {
    setActiveServiceTab((prev) =>
      Math.min(prev, Math.max(0, serviceEntries.length - 1))
    );
  }, [serviceEntries.length]);

  useEffect(() => {
    setActiveCapabilityTab((prev) =>
      Math.min(prev, Math.max(0, capabilityTagEntries.length - 1))
    );
  }, [capabilityTagEntries.length]);

  useEffect(() => {
    const target =
      activeSpecificationEditor === "function"
        ? functionEditorRef.current
        : activeSpecificationEditor === "service"
          ? serviceEditorRef.current
          : activeSpecificationEditor === "specialty"
            ? specialtyEditorRef.current
            : activeSpecificationEditor === "capability"
              ? capabilityEditorRef.current
              : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeSpecificationEditor]);

  const openSpecificationEditor = (key: "function" | "service" | "specialty" | "capability") => {
    setShowFunctionEditor(key === "function");
    setShowServiceEditor(key === "service");
    setShowSpecialtyEditor(key === "specialty");
    setShowCapabilityEditor(key === "capability");
    setActiveSpecificationEditor(key);
  };

  useEffect(() => {
    setSpecialtiesPerUnit((prev) =>
      prev.map((unitSelections) =>
        unitSelections.map((selection) => {
          const specialty = selection.specialty;
          if (!specialty || !specialtyCatalog[specialty]) {
            return {
              specialty: "",
              subspecialty: "",
              sessionCount: selection.sessionCount,
            };
          }
          const validSubspecialties = specialtyCatalog[specialty] || [];
          return {
            specialty,
            subspecialty: validSubspecialties.includes(selection.subspecialty)
              ? selection.subspecialty
              : validSubspecialties[0] || "",
            sessionCount: selection.sessionCount,
          };
        })
      )
    );
  }, [specialtyCatalog]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(e.target as Node)) {
        setFileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  const hasRoomStaffRolesForUnit = (unitIdx: number) => roomStaffRoleOptionsForUnit(unitIdx).length > 0;
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
          <td
            key="c"
            rowSpan={section.rows}
            className={`block-label${section.prefix === "S.1." ? " room-label" : ""}`}
          >
            {cellRef("C", pageRow)}
            {section.label}
          </td>
        );
      }
      const rightExtraSlotClass = [
        rightSectionRow < section.rows - 1 ? "no-border-bottom" : "",
        rightSectionRow > 0 ? "no-border-top" : "",
      ]
        .filter(Boolean)
        .join(" ");
      cells.push(
        <td key="d" className={`${rightExtraSlotClass} slot-cell slot-cell-dual`.trim()} style={slotTextStyle}>
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
              <td key="a" rowSpan={3} className="block-label specification-block-label">
                {cellRef("A", pageRow)}
                <div className="specification-select-stack">
                  <div className="specification-select-wrap">
                    <select
                      className="specification-select"
                      value={specificationValueForUnitRoom(leftUnitIndex, roomNum)}
                      onChange={(e) =>
                        setSpecificationSelectionsPerUnit((prev) => {
                          const next = [...prev];
                          while (next.length < unitCount) next.push(Array.from({ length: 8 }, () => ""));
                          const unitSelections = [...(next[leftUnitIndex] || [])];
                          while (unitSelections.length < leftRooms) unitSelections.push("");
                          unitSelections[roomNum - 1] = e.target.value;
                          next[leftUnitIndex] = unitSelections;
                          return next;
                        })
                      }
                    >
                      <option value="">Specification</option>
                      {specificationOptionGroups.map((group) =>
                        group.options.length > 0 ? (
                          <optgroup key={`left-group-${leftUnitIndex}-${roomNum}-${group.label}`} label={group.label}>
                            {group.options.map((option) => (
                              <option key={`${group.label}-${option}`} value={option}>
                                {option}
                              </option>
                            ))}
                          </optgroup>
                        ) : null
                      )}
                    </select>
                  </div>
                  <div className="specification-select-wrap specification-select-wrap-pattern">
                    <select
                      className="specification-select specification-select-pattern"
                      value={operationalPatternValueForUnitRoom(leftUnitIndex, roomNum)}
                      onChange={(e) => setOperationalPatternValueForUnitRoom(leftUnitIndex, roomNum, e.target.value)}
                    >
                      <option value="">🕒</option>
                      {operationalPatternOptions.map((pattern) => (
                        <option key={`left-pattern-${pattern.shortCode}-${pattern.label}`} value={pattern.shortCode}>
                          {pattern.shortCode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </td>
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
              <td key="c" rowSpan={3} className="block-label specification-block-label">
                {cellRef("C", pageRow)}
                <div className="specification-select-stack">
                  <div className="specification-select-wrap">
                    <select
                      className="specification-select"
                      value={specificationValueForUnitRoom(rightUnitIndex, roomNum)}
                      onChange={(e) =>
                        setSpecificationSelectionsPerUnit((prev) => {
                          const next = [...prev];
                          while (next.length < unitCount) next.push(Array.from({ length: 8 }, () => ""));
                          const unitSelections = [...(next[rightUnitIndex] || [])];
                          while (unitSelections.length < rightRooms) unitSelections.push("");
                          unitSelections[roomNum - 1] = e.target.value;
                          next[rightUnitIndex] = unitSelections;
                          return next;
                        })
                      }
                    >
                      <option value="">Specification</option>
                      {specificationOptionGroups.map((group) =>
                        group.options.length > 0 ? (
                          <optgroup key={`right-group-${rightUnitIndex}-${roomNum}-${group.label}`} label={group.label}>
                            {group.options.map((option) => (
                              <option key={`${group.label}-${option}`} value={option}>
                                {option}
                              </option>
                            ))}
                          </optgroup>
                        ) : null
                      )}
                    </select>
                  </div>
                  <div className="specification-select-wrap specification-select-wrap-pattern">
                    <select
                      className="specification-select specification-select-pattern"
                      value={operationalPatternValueForUnitRoom(rightUnitIndex, roomNum)}
                      onChange={(e) => setOperationalPatternValueForUnitRoom(rightUnitIndex, roomNum, e.target.value)}
                    >
                      <option value="">🕒</option>
                      {operationalPatternOptions.map((pattern) => (
                        <option key={`right-pattern-${pattern.shortCode}-${pattern.label}`} value={pattern.shortCode}>
                          {pattern.shortCode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </td>
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
    <main className={`allocation-page ${printPaper === "A4" ? "print-a4" : "print-a3"}`} style={allocationThemeVars}>
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
                Configure the template on the left. The template table on the right stays untouched.
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
                          <label className="form-label">How should the date appear on the template?</label>
                          <select
                            className="form-input"
                            value={allocationDateFormat}
                            onChange={(e) => setAllocationDateFormat(e.target.value)}
                          >
                            <option value="day-date">DAY/DATE</option>
                            <option value="weekday-slash">MONDAY, 23/02/2026</option>
                            <option value="weekday-long">MONDAY 23 FEBRUARY 2026</option>
                            <option value="slash">23/02/2026</option>
                            <option value="short-month">23 FEB 2026</option>
                          </select>
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
                                      while (copy.length < next) copy.push("Sub Unit");
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
                                    setSpecificationSelectionsPerUnit((prev) => {
                                      const copy = [...prev];
                                      while (copy.length < next) copy.push(Array.from({ length: 8 }, () => ""));
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
                            <span>How should sub unit sequencing appear?</span>
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
                            <div className="field-hint">Example: Numerical uses Sub Unit 1, Sub Unit 2. Alphabetical uses Sub Unit A, Sub Unit B.</div>
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
                            <label className="form-label">What should this sub unit type be called?</label>
                            <input
                              className="form-input"
                              type="text"
                              value={subunitLabelPerUnit[i] ?? ""}
                              onChange={(e) => {
                                const next = [...subunitLabelPerUnit];
                                next[i] = e.target.value;
                                setSubunitLabelPerUnit(next);
                              }}
                              placeholder="e.g., Theatre"
                            />
                            <label className="form-label">No. of Sub Units</label>
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
                                setSpecificationSelectionsPerUnit((prev) => {
                                  const outer = [...prev];
                                  while (outer.length < unitCount) {
                                    outer.push(Array.from({ length: 8 }, () => ""));
                                  }
                                  const current = [...(outer[i] || [])];
                                  while (current.length < roomCount) current.push("");
                                  outer[i] = current.slice(0, roomCount);
                                  return outer;
                                });
                              }}
                              placeholder="e.g., 8"
                            />
                            <label className="form-label">{`Where should sub unit labels in Unit ${i + 1} start?`}</label>
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

                <section className={`panel-card specification-panel${isSectionOpen(3) ? " is-open" : ""}${activeSection === 3 ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="panel-card-toggle"
                    onClick={() => togglePanelSection(3)}
                    aria-expanded={isSectionOpen(3)}
                  >
                    <span className="panel-card-copy">
                      <span className="panel-card-title">Specification</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(3) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(3) ? " is-open" : ""}`}>
                    <div className="panel-card-inner">
                      <div className="form-grid">
                        <div className="form-row form-row-compact">
                          <label className="form-label">What should each sub unit be classified by?</label>
                          <div className="radio-group radio-group-plain">
                            <div className="classification-item">
                              <label className="radio-item">
                                <input
                                  type="checkbox"
                                  checked={includeFunctionDescriptor}
                                  onChange={() => setIncludeFunctionDescriptor((prev) => !prev)}
                                />
                                <span>Function</span>
                                {!showFunctionEditor ? (
                                  <button
                                    type="button"
                                    className="classification-update-link"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openSpecificationEditor("function");
                                    }}
                                  >
                                    <em>Update list</em>
                                  </button>
                                ) : null}
                                <button
                                  type="button"
                                  className="info-badge-button"
                                  aria-label="Show function examples"
                                  aria-expanded={activeSpecificationHelp === "function"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSpecificationHelp((prev) => (prev === "function" ? "" : "function"));
                                  }}
                                >
                                  <span className="info-badge">i</span>
                                </button>
                              </label>
                              {activeSpecificationHelp === "function" ? (
                                <div className="field-hint">
                                  <div>Function: what the sub unit is primarily for.</div>
                                  <div>Examples: Operating, Procedure, Recovery, Assessment, Preparation.</div>
                                </div>
                              ) : null}
                            </div>
                            <div className="classification-item">
                              <label className="radio-item">
                                <input
                                  type="checkbox"
                                  checked={includeServiceDescriptor}
                                  onChange={() => setIncludeServiceDescriptor((prev) => !prev)}
                                />
                                <span>Service</span>
                                {!showServiceEditor ? (
                                  <button
                                    type="button"
                                    className="classification-update-link"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openSpecificationEditor("service");
                                    }}
                                  >
                                    <em>Update list</em>
                                  </button>
                                ) : null}
                                <button
                                  type="button"
                                  className="info-badge-button"
                                  aria-label="Show service examples"
                                  aria-expanded={activeSpecificationHelp === "service"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSpecificationHelp((prev) => (prev === "service" ? "" : "service"));
                                  }}
                                >
                                  <span className="info-badge">i</span>
                                </button>
                              </label>
                              {activeSpecificationHelp === "service" ? (
                                <div className="field-hint">
                                  <div>Service: what service line or business stream it belongs to.</div>
                                  <div>Examples: Elective, Trauma, Emergency, Day Surgery.</div>
                                </div>
                              ) : null}
                            </div>
                            <div className="classification-item">
                              <label className="radio-item">
                                <input
                                  type="checkbox"
                                  checked={includeSpecialtyDescriptor}
                                  onChange={() => setIncludeSpecialtyDescriptor((prev) => !prev)}
                                />
                                <span>Specialty</span>
                                {!showSpecialtyEditor ? (
                                  <button
                                    type="button"
                                    className="classification-update-link"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openSpecificationEditor("specialty");
                                    }}
                                  >
                                    <em>Update list</em>
                                  </button>
                                ) : null}
                                <button
                                  type="button"
                                  className="info-badge-button"
                                  aria-label="Show specialty examples"
                                  aria-expanded={activeSpecificationHelp === "specialty"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSpecificationHelp((prev) => (prev === "specialty" ? "" : "specialty"));
                                  }}
                                >
                                  <span className="info-badge">i</span>
                                </button>
                              </label>
                              {activeSpecificationHelp === "specialty" ? (
                                <div className="field-hint">
                                  <div>Specialty: domain-specific discipline, only when relevant.</div>
                                  <div>Examples: Orthopaedics/Spine, ENT/Otology, Urology/Endourology.</div>
                                </div>
                              ) : null}
                            </div>
                            <div className="classification-item">
                              <label className="radio-item">
                                <input
                                  type="checkbox"
                                  checked={includeCapabilityTags}
                                  onChange={() => setIncludeCapabilityTags((prev) => !prev)}
                                />
                                <span>Capability Tags</span>
                                {!showCapabilityEditor ? (
                                  <button
                                    type="button"
                                    className="classification-update-link"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openSpecificationEditor("capability");
                                    }}
                                  >
                                    <em>Update list</em>
                                  </button>
                                ) : null}
                                <button
                                  type="button"
                                  className="info-badge-button"
                                  aria-label="Show capability tag examples"
                                  aria-expanded={activeSpecificationHelp === "capability"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSpecificationHelp((prev) => (prev === "capability" ? "" : "capability"));
                                  }}
                                >
                                  <span className="info-badge">i</span>
                                </button>
                              </label>
                              {activeSpecificationHelp === "capability" ? (
                                <div className="field-hint">
                                  <div>Capability Tags: optional attributes describing what the sub unit can handle.</div>
                                  <div>Examples: Robotic, Imaging, Laminar Flow, Major Cases, Paediatric.</div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {showFunctionEditor ? (
                          <div
                            ref={functionEditorRef}
                            className={`form-row form-row-compact${activeSpecificationEditor === "function" ? " is-spec-editor-active" : ""}`}
                          >
                            <div className="spec-editor-header">
                              <label className="form-label">Function</label>
                              <button
                                type="button"
                                className="spec-editor-close"
                                aria-label="Close Function list"
                                onClick={() => {
                                  setShowFunctionEditor(false);
                                  if (activeSpecificationEditor === "function") setActiveSpecificationEditor("");
                                }}
                              >
                                x
                              </button>
                            </div>
                            <div className="specialty-tab-toolbar">
                              <button
                                type="button"
                                className="specialty-action-link"
                                onClick={() =>
                                  setFunctionEntries((prev) => {
                                    const nextIndex = prev.length + 1;
                                    const defaultLabel = `Function ${nextIndex}`;
                                    const next = [...prev, { label: defaultLabel, abbreviation: "", subEntries: [] }];
                                    setActiveFunctionTab(next.length - 1);
                                    setEditingFunctionTab(next.length - 1);
                                    setEditingFunctionValue(defaultLabel);
                                    setEditingFunctionAbbreviation("");
                                    setEditingFunctionOriginalValue(defaultLabel);
                                    setEditingFunctionOriginalAbbreviation("");
                                    return next;
                                  })
                                }
                              >
                                + Add Function
                              </button>
                            </div>
                            {functionEntries.length > 0 ? (
                              <>
                                <div className="specialty-tab-row">
                                  {functionEntries.map((entry, idx) => (
                                    <button
                                      key={`function-tab-${idx}`}
                                      type="button"
                                      className={`specialty-tab-btn${activeFunctionTab === idx ? " is-active" : ""}`}
                                      onClick={() => {
                                        setActiveFunctionTab(idx);
                                        setEditingFunctionTab(null);
                                      }}
                                    >
                                      <span className="specialty-tab-main">{entry.label.trim() || `Function ${idx + 1}`}</span>
                                      <span className="specialty-tab-abbrev">{entry.abbreviation.trim() || "ABBREVIATION"}</span>
                                    </button>
                                  ))}
                                </div>
                                {functionEntries[activeFunctionTab] ? (
                                  <div className="specialty-tab-actions">
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() => {
                                        const current = functionEntries[activeFunctionTab];
                                        setEditingFunctionTab(activeFunctionTab);
                                        setEditingFunctionValue(current?.label || "");
                                        setEditingFunctionAbbreviation(current?.abbreviation || "");
                                        setEditingFunctionOriginalValue(current?.label || "");
                                        setEditingFunctionOriginalAbbreviation(current?.abbreviation || "");
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setFunctionEntries((prev) => {
                                          if (!prev[activeFunctionTab]) return prev;
                                          const next = [...prev];
                                          const target = { ...next[activeFunctionTab] };
                                          target.subEntries = [...(target.subEntries || []), ""];
                                          next[activeFunctionTab] = target;
                                          return next;
                                        })
                                      }
                                    >
                                      Add Sub Function
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setFunctionEntries((prev) => {
                                          if (!prev[activeFunctionTab]) return prev;
                                          const next = [...prev];
                                          next.splice(activeFunctionTab, 1);
                                          setEditingFunctionTab(null);
                                          if (next.length === 0) {
                                            return [{ label: "", abbreviation: "", subEntries: [] }];
                                          }
                                          if (activeFunctionTab >= next.length) setActiveFunctionTab(next.length - 1);
                                          return next;
                                        })
                                      }
                                    >
                                      Delete Function
                                    </button>
                                  </div>
                                ) : null}
                                {functionEntries[activeFunctionTab] ? (
                                  <div className="field-hint">
                                    Sub Functions: {functionEntries[activeFunctionTab]?.subEntries?.length || 0}
                                  </div>
                                ) : null}
                                {(functionEntries[activeFunctionTab]?.subEntries?.length || 0) > 0 ? (
                                  <div className="role-entry-list">
                                    {functionEntries[activeFunctionTab].subEntries.map((sub, subIdx) => (
                                      <div className="role-entry-row" key={`sub-function-${activeFunctionTab}-${subIdx}`}>
                                        <input
                                          className="form-input"
                                          type="text"
                                          value={sub}
                                          onChange={(e) =>
                                            setFunctionEntries((prev) => {
                                              if (!prev[activeFunctionTab]) return prev;
                                              const next = [...prev];
                                              const target = { ...next[activeFunctionTab] };
                                              const list = [...(target.subEntries || [])];
                                              list[subIdx] = e.target.value;
                                              target.subEntries = list;
                                              next[activeFunctionTab] = target;
                                              return next;
                                            })
                                          }
                                          placeholder={`Sub Function ${subIdx + 1}`}
                                        />
                                        <div className="role-entry-actions">
                                          <button
                                            type="button"
                                            className="icon-action-button"
                                            aria-label="Remove sub function"
                                            onClick={() =>
                                              setFunctionEntries((prev) => {
                                                if (!prev[activeFunctionTab]) return prev;
                                                const next = [...prev];
                                                const target = { ...next[activeFunctionTab] };
                                                const list = [...(target.subEntries || [])];
                                                if (list.length <= 1) return prev;
                                                list.splice(subIdx, 1);
                                                target.subEntries = list;
                                                next[activeFunctionTab] = target;
                                                return next;
                                              })
                                            }
                                            disabled={(functionEntries[activeFunctionTab]?.subEntries?.length || 0) <= 1}
                                          >
                                            -
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                                {editingFunctionTab === activeFunctionTab ? (
                                  <>
                                    <div className="specialty-edit-row">
                                      <input
                                        className="form-input"
                                        type="text"
                                        autoFocus
                                        value={editingFunctionValue}
                                        onChange={(e) => {
                                          const nextValue = e.target.value;
                                          setEditingFunctionValue(nextValue);
                                          setFunctionEntries((prev) => {
                                            if (!prev[activeFunctionTab]) return prev;
                                            const next = [...prev];
                                            next[activeFunctionTab] = { ...next[activeFunctionTab], label: nextValue };
                                            return next;
                                          });
                                        }}
                                        placeholder="Function"
                                      />
                                      <input
                                        className="form-input"
                                        type="text"
                                        value={editingFunctionAbbreviation}
                                        onChange={(e) => {
                                          const nextValue = e.target.value;
                                          setEditingFunctionAbbreviation(nextValue);
                                          setFunctionEntries((prev) => {
                                            if (!prev[activeFunctionTab]) return prev;
                                            const next = [...prev];
                                            next[activeFunctionTab] = { ...next[activeFunctionTab], abbreviation: nextValue };
                                            return next;
                                          });
                                        }}
                                        placeholder="ABBREVIATION"
                                      />
                                    </div>
                                    <div className="specialty-tab-actions">
                                      <button type="button" className="specialty-action-link" onClick={() => setEditingFunctionTab(null)}>
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        className="specialty-action-link"
                                        onClick={() =>
                                          setFunctionEntries((prev) => {
                                            if (!prev[activeFunctionTab]) return prev;
                                            const next = [...prev];
                                            next[activeFunctionTab] = {
                                              ...next[activeFunctionTab],
                                              label: editingFunctionOriginalValue,
                                              abbreviation: editingFunctionOriginalAbbreviation,
                                            };
                                            setEditingFunctionValue(editingFunctionOriginalValue);
                                            setEditingFunctionAbbreviation(editingFunctionOriginalAbbreviation);
                                            setEditingFunctionTab(null);
                                            return next;
                                          })
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        ) : null}
                        {showServiceEditor ? (
                          <div
                            ref={serviceEditorRef}
                            className={`form-row form-row-compact${activeSpecificationEditor === "service" ? " is-spec-editor-active" : ""}`}
                          >
                            <div className="spec-editor-header">
                              <label className="form-label">Service</label>
                              <button
                                type="button"
                                className="spec-editor-close"
                                aria-label="Close Service list"
                                onClick={() => {
                                  setShowServiceEditor(false);
                                  if (activeSpecificationEditor === "service") setActiveSpecificationEditor("");
                                }}
                              >
                                x
                              </button>
                            </div>
                            <div className="specialty-tab-toolbar">
                              <button
                                type="button"
                                className="specialty-action-link"
                                onClick={() =>
                                  setServiceEntries((prev) => {
                                    const nextIndex = prev.length + 1;
                                    const defaultLabel = `Service ${nextIndex}`;
                                    const next = [...prev, { label: defaultLabel, abbreviation: "", subEntries: [] }];
                                    setActiveServiceTab(next.length - 1);
                                    setEditingServiceTab(next.length - 1);
                                    setEditingServiceValue(defaultLabel);
                                    setEditingServiceAbbreviation("");
                                    setEditingServiceOriginalValue(defaultLabel);
                                    setEditingServiceOriginalAbbreviation("");
                                    return next;
                                  })
                                }
                              >
                                + Add Service
                              </button>
                            </div>
                            {serviceEntries.length > 0 ? (
                              <>
                                <div className="specialty-tab-row">
                                  {serviceEntries.map((entry, idx) => (
                                    <button
                                      key={`service-tab-${idx}`}
                                      type="button"
                                      className={`specialty-tab-btn${activeServiceTab === idx ? " is-active" : ""}`}
                                      onClick={() => {
                                        setActiveServiceTab(idx);
                                        setEditingServiceTab(null);
                                      }}
                                    >
                                      <span className="specialty-tab-main">{entry.label.trim() || `Service ${idx + 1}`}</span>
                                      <span className="specialty-tab-abbrev">{entry.abbreviation.trim() || "ABBREVIATION"}</span>
                                    </button>
                                  ))}
                                </div>
                                {serviceEntries[activeServiceTab] ? (
                                  <div className="specialty-tab-actions">
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() => {
                                        const current = serviceEntries[activeServiceTab];
                                        setEditingServiceTab(activeServiceTab);
                                        setEditingServiceValue(current?.label || "");
                                        setEditingServiceAbbreviation(current?.abbreviation || "");
                                        setEditingServiceOriginalValue(current?.label || "");
                                        setEditingServiceOriginalAbbreviation(current?.abbreviation || "");
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setServiceEntries((prev) => {
                                          if (!prev[activeServiceTab]) return prev;
                                          const next = [...prev];
                                          const target = { ...next[activeServiceTab] };
                                          target.subEntries = [...(target.subEntries || []), ""];
                                          next[activeServiceTab] = target;
                                          return next;
                                        })
                                      }
                                    >
                                      Add Sub Service
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setServiceEntries((prev) => {
                                          if (!prev[activeServiceTab]) return prev;
                                          const next = [...prev];
                                          next.splice(activeServiceTab, 1);
                                          setEditingServiceTab(null);
                                          if (next.length === 0) {
                                            return [{ label: "", abbreviation: "", subEntries: [] }];
                                          }
                                          if (activeServiceTab >= next.length) setActiveServiceTab(next.length - 1);
                                          return next;
                                        })
                                      }
                                    >
                                      Delete Service
                                    </button>
                                  </div>
                                ) : null}
                                {serviceEntries[activeServiceTab] ? (
                                  <div className="field-hint">
                                    Sub Services: {serviceEntries[activeServiceTab]?.subEntries?.length || 0}
                                  </div>
                                ) : null}
                                {(serviceEntries[activeServiceTab]?.subEntries?.length || 0) > 0 ? (
                                  <div className="role-entry-list">
                                    {serviceEntries[activeServiceTab].subEntries.map((sub, subIdx) => (
                                      <div className="role-entry-row" key={`sub-service-${activeServiceTab}-${subIdx}`}>
                                        <input
                                          className="form-input"
                                          type="text"
                                          value={sub}
                                          onChange={(e) =>
                                            setServiceEntries((prev) => {
                                              if (!prev[activeServiceTab]) return prev;
                                              const next = [...prev];
                                              const target = { ...next[activeServiceTab] };
                                              const list = [...(target.subEntries || [])];
                                              list[subIdx] = e.target.value;
                                              target.subEntries = list;
                                              next[activeServiceTab] = target;
                                              return next;
                                            })
                                          }
                                          placeholder={`Sub Service ${subIdx + 1}`}
                                        />
                                        <div className="role-entry-actions">
                                          <button
                                            type="button"
                                            className="icon-action-button"
                                            aria-label="Remove sub service"
                                            onClick={() =>
                                              setServiceEntries((prev) => {
                                                if (!prev[activeServiceTab]) return prev;
                                                const next = [...prev];
                                                const target = { ...next[activeServiceTab] };
                                                const list = [...(target.subEntries || [])];
                                                if (list.length <= 1) return prev;
                                                list.splice(subIdx, 1);
                                                target.subEntries = list;
                                                next[activeServiceTab] = target;
                                                return next;
                                              })
                                            }
                                            disabled={(serviceEntries[activeServiceTab]?.subEntries?.length || 0) <= 1}
                                          >
                                            -
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                                {editingServiceTab === activeServiceTab ? (
                                  <>
                                    <div className="specialty-edit-row">
                                      <input
                                        className="form-input"
                                        type="text"
                                        autoFocus
                                        value={editingServiceValue}
                                        onChange={(e) => {
                                          const nextValue = e.target.value;
                                          setEditingServiceValue(nextValue);
                                          setServiceEntries((prev) => {
                                            if (!prev[activeServiceTab]) return prev;
                                            const next = [...prev];
                                            next[activeServiceTab] = { ...next[activeServiceTab], label: nextValue };
                                            return next;
                                          });
                                        }}
                                        placeholder="Service"
                                      />
                                      <input
                                        className="form-input"
                                        type="text"
                                        value={editingServiceAbbreviation}
                                        onChange={(e) => {
                                          const nextValue = e.target.value;
                                          setEditingServiceAbbreviation(nextValue);
                                          setServiceEntries((prev) => {
                                            if (!prev[activeServiceTab]) return prev;
                                            const next = [...prev];
                                            next[activeServiceTab] = { ...next[activeServiceTab], abbreviation: nextValue };
                                            return next;
                                          });
                                        }}
                                        placeholder="ABBREVIATION"
                                      />
                                    </div>
                                    <div className="specialty-tab-actions">
                                      <button type="button" className="specialty-action-link" onClick={() => setEditingServiceTab(null)}>
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        className="specialty-action-link"
                                        onClick={() =>
                                          setServiceEntries((prev) => {
                                            if (!prev[activeServiceTab]) return prev;
                                            const next = [...prev];
                                            next[activeServiceTab] = {
                                              ...next[activeServiceTab],
                                              label: editingServiceOriginalValue,
                                              abbreviation: editingServiceOriginalAbbreviation,
                                            };
                                            setEditingServiceValue(editingServiceOriginalValue);
                                            setEditingServiceAbbreviation(editingServiceOriginalAbbreviation);
                                            setEditingServiceTab(null);
                                            return next;
                                          })
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        ) : null}
                        {showSpecialtyEditor ? (
                          <div
                            ref={specialtyEditorRef}
                            className={`form-row form-row-compact${activeSpecificationEditor === "specialty" ? " is-spec-editor-active" : ""}`}
                          >
                            <div className="spec-editor-header">
                              <label className="form-label">Specialty</label>
                              <button
                                type="button"
                                className="spec-editor-close"
                                aria-label="Close Specialty list"
                                onClick={() => {
                                  setShowSpecialtyEditor(false);
                                  if (activeSpecificationEditor === "specialty") setActiveSpecificationEditor("");
                                }}
                              >
                                x
                              </button>
                            </div>
                            <div className="specialty-tab-toolbar">
                              <button
                                type="button"
                                className="specialty-action-link"
                                onClick={() =>
                                  setSpecialtyTreeEntries((prev) => {
                                    const nextIndex = prev.length + 1;
                                    const defaultName = `Core Specialty ${nextIndex}`;
                                    const next = [
                                      ...prev,
                                      { specialty: defaultName, abbreviation: "", subspecialties: [""] },
                                    ];
                                    setActiveSpecialtyTab(next.length - 1);
                                    setEditingSpecialtyTab(next.length - 1);
                                    setEditingSpecialtyValue(defaultName);
                                    setEditingSpecialtyAbbreviation("");
                                    return next;
                                  })
                                }
                              >
                                + Add Core Specialty
                              </button>
                            </div>
                            {specialtyTreeEntries.length > 0 ? (
                              <>
                                <div className="specialty-tab-row">
                                  {specialtyTreeEntries.map((entry, idx) => {
                                    const label = entry.specialty.trim() || `Core Specialty ${idx + 1}`;
                                    const abbreviation = entry.abbreviation?.trim() || "";
                                    return (
                                      <button
                                        key={`specialty-tab-${idx}`}
                                        type="button"
                                        className={`specialty-tab-btn${activeSpecialtyTab === idx ? " is-active" : ""}`}
                                        onClick={() => {
                                          setActiveSpecialtyTab(idx);
                                          setEditingSpecialtyTab(null);
                                        }}
                                      >
                                        <span className="specialty-tab-main">{label}</span>
                                        <span className="specialty-tab-abbrev">{abbreviation || "ABBREVIATION"}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                                {specialtyTreeEntries[activeSpecialtyTab] ? (
                                  <div className="specialty-tab-actions">
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() => {
                                        setEditingSpecialtyTab(activeSpecialtyTab);
                                        const currentSpecialty =
                                          specialtyTreeEntries[activeSpecialtyTab]?.specialty?.trim() ||
                                          `Core Specialty ${activeSpecialtyTab + 1}`;
                                        const currentAbbreviation =
                                          specialtyTreeEntries[activeSpecialtyTab]?.abbreviation?.trim() || "";
                                        setEditingSpecialtyValue(currentSpecialty);
                                        setEditingSpecialtyAbbreviation(currentAbbreviation);
                                        setEditingSpecialtyOriginalValue(currentSpecialty);
                                        setEditingSpecialtyOriginalAbbreviation(currentAbbreviation);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setSpecialtyTreeEntries((prev) => {
                                          if (!prev[activeSpecialtyTab]) return prev;
                                          const next = [...prev];
                                          next.splice(activeSpecialtyTab, 1);
                                          setEditingSpecialtyTab(null);
                                          if (next.length === 0) {
                                            setActiveSpecialtyTab(0);
                                          } else if (activeSpecialtyTab >= next.length) {
                                            setActiveSpecialtyTab(next.length - 1);
                                          }
                                          return next;
                                        })
                                      }
                                    >
                                      Delete Core Specialty
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setSpecialtyTreeEntries((prev) => {
                                          if (!prev[activeSpecialtyTab]) return prev;
                                          const next = [...prev];
                                          const target = { ...next[activeSpecialtyTab] };
                                          const current = target.subspecialties || [];
                                          target.subspecialties = [...current, ""];
                                          next[activeSpecialtyTab] = target;
                                          return next;
                                        })
                                      }
                                    >
                                      Add Subspecialty
                                    </button>
                                  </div>
                                ) : null}
                                {editingSpecialtyTab === activeSpecialtyTab ? (
                                  <div className="specialty-edit-row">
                                    <input
                                      className="form-input"
                                      type="text"
                                      autoFocus
                                      value={editingSpecialtyValue}
                                      onChange={(e) => {
                                        const nextValue = e.target.value;
                                        setEditingSpecialtyValue(nextValue);
                                        setSpecialtyTreeEntries((prev) => {
                                          if (!prev[activeSpecialtyTab]) return prev;
                                          const next = [...prev];
                                          next[activeSpecialtyTab] = {
                                            ...next[activeSpecialtyTab],
                                            specialty: nextValue,
                                          };
                                          return next;
                                        });
                                      }}
                                      placeholder="Core Specialty"
                                    />
                                    <input
                                      className="form-input"
                                      type="text"
                                      value={editingSpecialtyAbbreviation}
                                      onChange={(e) => {
                                        const nextValue = e.target.value;
                                        setEditingSpecialtyAbbreviation(nextValue);
                                        setSpecialtyTreeEntries((prev) => {
                                          if (!prev[activeSpecialtyTab]) return prev;
                                          const next = [...prev];
                                          next[activeSpecialtyTab] = {
                                            ...next[activeSpecialtyTab],
                                            abbreviation: nextValue,
                                          };
                                          return next;
                                        });
                                      }}
                                      placeholder="ABBREVIATION"
                                    />
                                  </div>
                                ) : null}
                                {specialtyTreeEntries[activeSpecialtyTab] ? (
                                  <div className="field-hint">
                                    Subspecialties: {specialtyTreeEntries[activeSpecialtyTab]?.subspecialties?.length || 0}
                                  </div>
                                ) : null}
                                {(specialtyTreeEntries[activeSpecialtyTab]?.subspecialties?.length || 0) > 0 ? (
                                  <div className="role-entry-list">
                                    {specialtyTreeEntries[activeSpecialtyTab].subspecialties.map((sub, subIdx) => (
                                      <div className="role-entry-row" key={`subspecialty-input-${activeSpecialtyTab}-${subIdx}`}>
                                        <input
                                          className="form-input"
                                          type="text"
                                          value={sub}
                                          onChange={(e) =>
                                            setSpecialtyTreeEntries((prev) => {
                                              if (!prev[activeSpecialtyTab]) return prev;
                                              const next = [...prev];
                                              const target = { ...next[activeSpecialtyTab] };
                                              const list = [...(target.subspecialties || [])];
                                              list[subIdx] = e.target.value;
                                              target.subspecialties = list;
                                              next[activeSpecialtyTab] = target;
                                              return next;
                                            })
                                          }
                                          placeholder={`Subspecialty ${subIdx + 1}`}
                                        />
                                        <div className="role-entry-actions">
                                          <button
                                            type="button"
                                            className="icon-action-button"
                                            aria-label="Remove subspecialty"
                                            onClick={() =>
                                              setSpecialtyTreeEntries((prev) => {
                                                if (!prev[activeSpecialtyTab]) return prev;
                                                const next = [...prev];
                                                const target = { ...next[activeSpecialtyTab] };
                                                const list = [...(target.subspecialties || [])];
                                                if (list.length <= 1) return prev;
                                                list.splice(subIdx, 1);
                                                target.subspecialties = list;
                                                next[activeSpecialtyTab] = target;
                                                return next;
                                              })
                                            }
                                            disabled={(specialtyTreeEntries[activeSpecialtyTab]?.subspecialties?.length || 0) <= 1}
                                          >
                                            -
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                                {editingSpecialtyTab === activeSpecialtyTab ? (
                                  <div className="specialty-tab-actions">
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() => setEditingSpecialtyTab(null)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setSpecialtyTreeEntries((prev) => {
                                          if (!prev[activeSpecialtyTab]) return prev;
                                          const next = [...prev];
                                          next[activeSpecialtyTab] = {
                                            ...next[activeSpecialtyTab],
                                            specialty: editingSpecialtyOriginalValue,
                                            abbreviation: editingSpecialtyOriginalAbbreviation,
                                          };
                                          setEditingSpecialtyValue(editingSpecialtyOriginalValue);
                                          setEditingSpecialtyAbbreviation(editingSpecialtyOriginalAbbreviation);
                                          setEditingSpecialtyTab(null);
                                          return next;
                                        })
                                      }
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : null}
                              </>
                            ) : (
                              <div className="field-hint">No core specialties added yet.</div>
                            )}
                          </div>
                        ) : null}
                        {showCapabilityEditor ? (
                          <div
                            ref={capabilityEditorRef}
                            className={`form-row form-row-compact${activeSpecificationEditor === "capability" ? " is-spec-editor-active" : ""}`}
                          >
                            <div className="spec-editor-header">
                              <label className="form-label">Capability Tags</label>
                              <button
                                type="button"
                                className="spec-editor-close"
                                aria-label="Close Capability list"
                                onClick={() => {
                                  setShowCapabilityEditor(false);
                                  if (activeSpecificationEditor === "capability") setActiveSpecificationEditor("");
                                }}
                              >
                                x
                              </button>
                            </div>
                            <div className="specialty-tab-toolbar">
                              <button
                                type="button"
                                className="specialty-action-link"
                                onClick={() =>
                                  setCapabilityTagEntries((prev) => {
                                    const nextIndex = prev.length + 1;
                                    const defaultLabel = `Capability ${nextIndex}`;
                                    const next = [...prev, { label: defaultLabel, abbreviation: "", subEntries: [] }];
                                    setActiveCapabilityTab(next.length - 1);
                                    setEditingCapabilityTab(next.length - 1);
                                    setEditingCapabilityValue(defaultLabel);
                                    setEditingCapabilityAbbreviation("");
                                    setEditingCapabilityOriginalValue(defaultLabel);
                                    setEditingCapabilityOriginalAbbreviation("");
                                    return next;
                                  })
                                }
                              >
                                + Add Capability Tag
                              </button>
                            </div>
                            {capabilityTagEntries.length > 0 ? (
                              <>
                                <div className="specialty-tab-row">
                                  {capabilityTagEntries.map((entry, idx) => (
                                    <button
                                      key={`capability-tab-${idx}`}
                                      type="button"
                                      className={`specialty-tab-btn${activeCapabilityTab === idx ? " is-active" : ""}`}
                                      onClick={() => {
                                        setActiveCapabilityTab(idx);
                                        setEditingCapabilityTab(null);
                                      }}
                                    >
                                      <span className="specialty-tab-main">{entry.label.trim() || `Capability ${idx + 1}`}</span>
                                      <span className="specialty-tab-abbrev">{entry.abbreviation.trim() || "ABBREVIATION"}</span>
                                    </button>
                                  ))}
                                </div>
                                {capabilityTagEntries[activeCapabilityTab] ? (
                                  <div className="specialty-tab-actions">
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() => {
                                        const current = capabilityTagEntries[activeCapabilityTab];
                                        setEditingCapabilityTab(activeCapabilityTab);
                                        setEditingCapabilityValue(current?.label || "");
                                        setEditingCapabilityAbbreviation(current?.abbreviation || "");
                                        setEditingCapabilityOriginalValue(current?.label || "");
                                        setEditingCapabilityOriginalAbbreviation(current?.abbreviation || "");
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setCapabilityTagEntries((prev) => {
                                          if (!prev[activeCapabilityTab]) return prev;
                                          const next = [...prev];
                                          const target = { ...next[activeCapabilityTab] };
                                          target.subEntries = [...(target.subEntries || []), ""];
                                          next[activeCapabilityTab] = target;
                                          return next;
                                        })
                                      }
                                    >
                                      Add Sub Capability
                                    </button>
                                    <button
                                      type="button"
                                      className="specialty-action-link"
                                      onClick={() =>
                                        setCapabilityTagEntries((prev) => {
                                          if (!prev[activeCapabilityTab]) return prev;
                                          const next = [...prev];
                                          next.splice(activeCapabilityTab, 1);
                                          setEditingCapabilityTab(null);
                                          if (next.length === 0) {
                                            return [{ label: "", abbreviation: "", subEntries: [] }];
                                          }
                                          if (activeCapabilityTab >= next.length) setActiveCapabilityTab(next.length - 1);
                                          return next;
                                        })
                                      }
                                    >
                                      Delete Capability Tag
                                    </button>
                                  </div>
                                ) : null}
                                {capabilityTagEntries[activeCapabilityTab] ? (
                                  <div className="field-hint">
                                    Sub Capabilities: {capabilityTagEntries[activeCapabilityTab]?.subEntries?.length || 0}
                                  </div>
                                ) : null}
                                {(capabilityTagEntries[activeCapabilityTab]?.subEntries?.length || 0) > 0 ? (
                                  <div className="role-entry-list">
                                    {capabilityTagEntries[activeCapabilityTab].subEntries.map((sub, subIdx) => (
                                      <div className="role-entry-row" key={`sub-capability-${activeCapabilityTab}-${subIdx}`}>
                                        <input
                                          className="form-input"
                                          type="text"
                                          value={sub}
                                          onChange={(e) =>
                                            setCapabilityTagEntries((prev) => {
                                              if (!prev[activeCapabilityTab]) return prev;
                                              const next = [...prev];
                                              const target = { ...next[activeCapabilityTab] };
                                              const list = [...(target.subEntries || [])];
                                              list[subIdx] = e.target.value;
                                              target.subEntries = list;
                                              next[activeCapabilityTab] = target;
                                              return next;
                                            })
                                          }
                                          placeholder={`Sub Capability ${subIdx + 1}`}
                                        />
                                        <div className="role-entry-actions">
                                          <button
                                            type="button"
                                            className="icon-action-button"
                                            aria-label="Remove sub capability"
                                            onClick={() =>
                                              setCapabilityTagEntries((prev) => {
                                                if (!prev[activeCapabilityTab]) return prev;
                                                const next = [...prev];
                                                const target = { ...next[activeCapabilityTab] };
                                                const list = [...(target.subEntries || [])];
                                                if (list.length <= 1) return prev;
                                                list.splice(subIdx, 1);
                                                target.subEntries = list;
                                                next[activeCapabilityTab] = target;
                                                return next;
                                              })
                                            }
                                            disabled={(capabilityTagEntries[activeCapabilityTab]?.subEntries?.length || 0) <= 1}
                                          >
                                            -
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                                {editingCapabilityTab === activeCapabilityTab ? (
                                  <>
                                    <div className="specialty-edit-row">
                                      <input
                                        className="form-input"
                                        type="text"
                                        autoFocus
                                        value={editingCapabilityValue}
                                        onChange={(e) => {
                                          const nextValue = e.target.value;
                                          setEditingCapabilityValue(nextValue);
                                          setCapabilityTagEntries((prev) => {
                                            if (!prev[activeCapabilityTab]) return prev;
                                            const next = [...prev];
                                            next[activeCapabilityTab] = { ...next[activeCapabilityTab], label: nextValue };
                                            return next;
                                          });
                                        }}
                                        placeholder="Capability Tag"
                                      />
                                      <input
                                        className="form-input"
                                        type="text"
                                        value={editingCapabilityAbbreviation}
                                        onChange={(e) => {
                                          const nextValue = e.target.value;
                                          setEditingCapabilityAbbreviation(nextValue);
                                          setCapabilityTagEntries((prev) => {
                                            if (!prev[activeCapabilityTab]) return prev;
                                            const next = [...prev];
                                            next[activeCapabilityTab] = { ...next[activeCapabilityTab], abbreviation: nextValue };
                                            return next;
                                          });
                                        }}
                                        placeholder="ABBREVIATION"
                                      />
                                    </div>
                                    <div className="specialty-tab-actions">
                                      <button type="button" className="specialty-action-link" onClick={() => setEditingCapabilityTab(null)}>
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        className="specialty-action-link"
                                        onClick={() =>
                                          setCapabilityTagEntries((prev) => {
                                            if (!prev[activeCapabilityTab]) return prev;
                                            const next = [...prev];
                                            next[activeCapabilityTab] = {
                                              ...next[activeCapabilityTab],
                                              label: editingCapabilityOriginalValue,
                                              abbreviation: editingCapabilityOriginalAbbreviation,
                                            };
                                            setEditingCapabilityValue(editingCapabilityOriginalValue);
                                            setEditingCapabilityAbbreviation(editingCapabilityOriginalAbbreviation);
                                            setEditingCapabilityTab(null);
                                            return next;
                                          })
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        ) : null}
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
                      <span className="panel-card-title">Operational Pattern</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(4) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(4) ? " is-open" : ""}`}>
                    <div className="panel-card-inner">
                      <div className="form-grid">
                        <div className="form-row form-row-compact">
                          <label className="form-label">What operational patterns are used?</label>
                          <div className="role-entry-list">
                            {operationalPatterns.map((pattern, idx) => (
                              <div className="pattern-entry-card" key={`pattern-entry-${idx}`}>
                                <div className="pattern-entry-grid">
                                  <input
                                    className="form-input"
                                    type="text"
                                    value={pattern.label}
                                    onChange={(e) =>
                                      setOperationalPatterns((prev) => {
                                        const next = [...prev];
                                        next[idx] = { ...next[idx], label: e.target.value };
                                        return next;
                                      })
                                    }
                                    placeholder={idx === 0 ? "e.g., Standard Day" : idx === 1 ? "e.g., AM Session" : "e.g., PM Session"}
                                  />
                                  <input
                                    className="form-input"
                                    type="text"
                                    value={pattern.shortCode}
                                    maxLength={5}
                                    onChange={(e) =>
                                      setOperationalPatterns((prev) => {
                                        const next = [...prev];
                                        next[idx] = { ...next[idx], shortCode: e.target.value.toUpperCase() };
                                        return next;
                                      })
                                    }
                                    placeholder="Code"
                                  />
                                  <input
                                    className="form-input"
                                    type="time"
                                    value={pattern.startTime}
                                    onChange={(e) =>
                                      setOperationalPatterns((prev) => {
                                        const next = [...prev];
                                        next[idx] = { ...next[idx], startTime: e.target.value };
                                        return next;
                                      })
                                    }
                                  />
                                  <input
                                    className="form-input"
                                    type="time"
                                    value={pattern.endTime}
                                    onChange={(e) =>
                                      setOperationalPatterns((prev) => {
                                        const next = [...prev];
                                        next[idx] = { ...next[idx], endTime: e.target.value };
                                        return next;
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                            <div className="role-entry-actions">
                              <button
                                type="button"
                                className="icon-action-button"
                                aria-label="Add operational pattern"
                                onClick={() =>
                                  setOperationalPatterns((prev) => [...prev, { label: "", shortCode: "", startTime: "08:00", endTime: "18:00" }])
                                }
                              >
                                +
                              </button>
                              <button
                                type="button"
                                className="icon-action-button"
                                aria-label="Remove operational pattern"
                                onClick={() =>
                                  setOperationalPatterns((prev) => {
                                    if (prev.length <= 1) return prev;
                                    const next = [...prev];
                                    next.splice(next.length - 1, 1);
                                    return next;
                                  })
                                }
                                disabled={operationalPatterns.length <= 1}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
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
                      <span className="panel-card-title">Other Services</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(5) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(5) ? " is-open" : ""}`}>
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

                <section className={`panel-card${isSectionOpen(6) ? " is-open" : ""}${activeSection === 6 ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="panel-card-toggle"
                    onClick={() => togglePanelSection(6)}
                    aria-expanded={isSectionOpen(6)}
                  >
                    <span className="panel-card-copy">
                      <span className="panel-card-title">Roles</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(6) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(6) ? " is-open" : ""}`}>
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
                                    {hasRoomStaffRolesForUnit(0) ? (
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
                                    ) : null}
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
                                      {hasRoomStaffRolesForUnit(i) ? (
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
                                      ) : null}
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

                <section className={`panel-card${isSectionOpen(7) ? " is-open" : ""}${activeSection === 7 ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="panel-card-toggle"
                    onClick={() => togglePanelSection(7)}
                    aria-expanded={isSectionOpen(7)}
                  >
                    <span className="panel-card-copy">
                      <span className="panel-card-title">Theme Customisation</span>
                    </span>
                    <span className={`panel-card-icon${isSectionOpen(7) ? " is-open" : ""}`}>&gt;</span>
                  </button>
                  <div className={`panel-card-body${isSectionOpen(7) ? " is-open" : ""}`}>
                    <div className="panel-card-inner">
                      <div className="theme-toolbar">
                        <div className="theme-tb-row">

                          {/* ── Font family + size ───────────────────── */}
                          <div className="theme-tb-group">
                            <select
                              className="theme-tb-select"
                              aria-label="Font family"
                              title="Font family"
                              value={activeThemeSettings.fontFamily}
                              onChange={(e) => applyThemeToTargets((current) => ({ ...current, fontFamily: e.target.value }))}
                            >
                              <option value="Manrope, sans-serif">Manrope</option>
                              <option value="Arial, sans-serif">Arial</option>
                              <option value="Georgia, serif">Georgia</option>
                            </select>
                            <select
                              className="theme-tb-size"
                              aria-label="Font size"
                              title="Font size"
                              value={String(activeThemeSettings.fontSize)}
                              onChange={(e) =>
                                applyThemeToTargets((current) => ({
                                  ...current,
                                  fontSize: Number(e.target.value) || current.fontSize,
                                }))
                              }
                            >
                              {themeSizeOptions.map((size) => (
                                <option key={`theme-size-${size}`} value={size}>{size}</option>
                              ))}
                            </select>
                          </div>

                          <div className="theme-tb-sep" aria-hidden="true" />

                          {/* ── Text style: Bold / Italic / Underline ── */}
                          <div className="theme-tb-group" role="group" aria-label="Text style">
                            <button
                              type="button"
                              className={`theme-tb-btn${activeThemeSettings.fontWeight >= 700 ? " is-active" : ""}`}
                              title="Bold"
                              aria-label="Bold"
                              aria-pressed={activeThemeSettings.fontWeight >= 700}
                              onClick={() =>
                                applyThemeToTargets((current) => ({
                                  ...current,
                                  fontWeight: current.fontWeight >= 700 ? 400 : 700,
                                }))
                              }
                            >
                              <Bold size={18} strokeWidth={2.5} />
                            </button>
                            <button
                              type="button"
                              className={`theme-tb-btn${activeThemeSettings.fontStyle === "italic" ? " is-active" : ""}`}
                              title="Italic"
                              aria-label="Italic"
                              aria-pressed={activeThemeSettings.fontStyle === "italic"}
                              onClick={() =>
                                applyThemeToTargets((current) => ({
                                  ...current,
                                  fontStyle: current.fontStyle === "italic" ? "normal" : "italic",
                                }))
                              }
                            >
                              <Italic size={18} strokeWidth={2.5} />
                            </button>
                            <button
                              type="button"
                              className={`theme-tb-btn${activeThemeSettings.textDecoration === "underline" ? " is-active" : ""}`}
                              title="Underline"
                              aria-label="Underline"
                              aria-pressed={activeThemeSettings.textDecoration === "underline"}
                              onClick={() =>
                                applyThemeToTargets((current) => ({
                                  ...current,
                                  textDecoration: current.textDecoration === "underline" ? "none" : "underline",
                                }))
                              }
                            >
                              <Underline size={18} strokeWidth={2.5} />
                            </button>
                          </div>

                          <div className="theme-tb-sep" aria-hidden="true" />

                          {/* ── Alignment ────────────────────────────── */}
                          <div className="theme-tb-group" role="group" aria-label="Text alignment">
                            <button
                              type="button"
                              className={`theme-tb-btn${activeThemeSettings.textAlign === "left" ? " is-active" : ""}`}
                              title="Align left"
                              aria-label="Align left"
                              aria-pressed={activeThemeSettings.textAlign === "left"}
                              onClick={() => applyThemeToTargets((current) => ({ ...current, textAlign: "left" }))}
                            >
                              <AlignLeft size={18} strokeWidth={2} />
                            </button>
                            <button
                              type="button"
                              className={`theme-tb-btn${activeThemeSettings.textAlign === "center" ? " is-active" : ""}`}
                              title="Align centre"
                              aria-label="Align centre"
                              aria-pressed={activeThemeSettings.textAlign === "center"}
                              onClick={() => applyThemeToTargets((current) => ({ ...current, textAlign: "center" }))}
                            >
                              <AlignCenter size={18} strokeWidth={2} />
                            </button>
                            <button
                              type="button"
                              className={`theme-tb-btn${activeThemeSettings.textAlign === "right" ? " is-active" : ""}`}
                              title="Align right"
                              aria-label="Align right"
                              aria-pressed={activeThemeSettings.textAlign === "right"}
                              onClick={() => applyThemeToTargets((current) => ({ ...current, textAlign: "right" }))}
                            >
                              <AlignRight size={18} strokeWidth={2} />
                            </button>
                          </div>

                          <div className="theme-tb-sep" aria-hidden="true" />

                          {/* ── Colour controls ──────────────────────── */}
                          <div className="theme-tb-group">
                            {/* Font colour + Fill colour */}
                            {(
                              [
                                { field: "fontColor" as const,      label: "Font colour", Icon: Baseline    },
                                { field: "backgroundFill" as const, label: "Fill colour", Icon: PaintBucket },
                              ] as const
                            ).map((colorField) => {
                              const pickerKey = `toolbar-${colorField.field}`;
                              const isOpen = openThemeColorPicker === pickerKey;
                              const colorValue = activeThemeSettings[colorField.field];
                              const { Icon } = colorField;
                              return (
                                <div className="theme-tb-color-wrap" key={pickerKey}>
                                  <button
                                    type="button"
                                    className={`theme-tb-color-btn${isOpen ? " is-active" : ""}`}
                                    onClick={(e) => {
                                      if (openThemeColorPicker === pickerKey) {
                                        setOpenThemeColorPicker(null);
                                      } else {
                                        openThemePopoverAt(e.currentTarget, pickerKey);
                                      }
                                    }}
                                    aria-expanded={isOpen}
                                    aria-label={colorField.label}
                                    title={colorField.label}
                                  >
                                    <span className="theme-tb-color-icon">
                                      <Icon size={17} strokeWidth={2} />
                                    </span>
                                    <span
                                      className="theme-tb-color-bar"
                                      style={{ backgroundColor: colorValue }}
                                    />
                                  </button>
                                  {isOpen ? (
                                    <div className="theme-color-popover" style={{ top: pickerAnchorCoords.top, left: pickerAnchorCoords.left }}>
                                      <div className="theme-swatch-grid">
                                        {themeSwatches.map((swatch) => (
                                          <button
                                            key={`${pickerKey}-${swatch}`}
                                            type="button"
                                            className={`theme-swatch${colorValue.toLowerCase() === swatch.toLowerCase() ? " is-active" : ""}`}
                                            style={{ backgroundColor: swatch }}
                                            onClick={() =>
                                              applyThemeToTargets((current) => ({ ...current, [colorField.field]: swatch }))
                                            }
                                            aria-label={`Set ${colorField.label} to ${swatch}`}
                                          />
                                        ))}
                                      </div>
                                      <div className="theme-color-popover-actions">
                                        <input
                                          className="theme-color-input"
                                          type="color"
                                          value={colorValue}
                                          onChange={(e) =>
                                            applyThemeToTargets((current) => ({ ...current, [colorField.field]: e.target.value }))
                                          }
                                        />
                                        <button
                                          type="button"
                                          className="theme-eyedrop-button"
                                          onClick={() => pickScreenColor(colorField.field)}
                                          disabled={!hasEyeDropper || activeThemeTargets.length === 0}
                                          title="Pick colour from screen"
                                          aria-label="Pick colour from screen"
                                        >
                                          <Pipette size={16} strokeWidth={2} />
                                        </button>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              );
                            })}

                            {/* ── Border split button ── */}
                            <div className="theme-tb-color-wrap">
                              <button
                                type="button"
                                className={`theme-tb-color-btn${openThemeColorPicker === "toolbar-border" ? " is-active" : ""}`}
                                onClick={(e) => {
                                  if (openThemeColorPicker === "toolbar-border") {
                                    setOpenThemeColorPicker(null);
                                  } else {
                                    openThemePopoverAt(e.currentTarget, "toolbar-border");
                                  }
                                }}
                                aria-label="Border options"
                                title="Border options"
                              >
                                <span className="theme-tb-color-icon">
                                    <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="currentColor" strokeWidth="1.5"/>
                                    <line x1="7.5" y1="0.75" x2="7.5" y2="14.25" stroke="currentColor" strokeWidth="0.75"/>
                                    <line x1="0.75" y1="7.5" x2="14.25" y2="7.5" stroke="currentColor" strokeWidth="0.75"/>
                                  </svg>
                                </span>
                                <span
                                  className="theme-tb-color-bar is-border"
                                  style={{ backgroundColor: "transparent", borderColor: activeThemeSettings.lineColor }}
                                />
                              </button>
                              {openThemeColorPicker === "toolbar-border" ? (
                                <div className="theme-border-popover" style={{ top: pickerAnchorCoords.top, left: pickerAnchorCoords.left }}>
                                  {/* Cell diagram — click edges to toggle each border */}
                                  <div className="theme-border-diagram">
                                    <div className="theme-border-diagram-grid">
                                      <div />
                                      <button
                                        type="button"
                                        className="theme-border-side-btn tbs-h"
                                        onClick={() => applyThemeToTargets((cur) => ({ ...cur, borderTop: !cur.borderTop }))}
                                        title="Toggle top border"
                                        style={{
                                          borderTop: activeThemeSettings.borderTop
                                            ? `${activeThemeSettings.borderWidth}px solid ${activeThemeSettings.lineColor}`
                                            : "2px dashed #b8cfe6",
                                        }}
                                      />
                                      <div />
                                      <button
                                        type="button"
                                        className="theme-border-side-btn tbs-v"
                                        onClick={() => applyThemeToTargets((cur) => ({ ...cur, borderLeft: !cur.borderLeft }))}
                                        title="Toggle left border"
                                        style={{
                                          borderLeft: activeThemeSettings.borderLeft
                                            ? `${activeThemeSettings.borderWidth}px solid ${activeThemeSettings.lineColor}`
                                            : "2px dashed #b8cfe6",
                                        }}
                                      />
                                      <div
                                        className="theme-border-cell-preview"
                                        style={{
                                          borderTop: activeThemeSettings.borderTop
                                            ? `${activeThemeSettings.borderWidth}px solid ${activeThemeSettings.lineColor}`
                                            : "2px dashed #c8d8e8",
                                          borderRight: activeThemeSettings.borderRight
                                            ? `${activeThemeSettings.borderWidth}px solid ${activeThemeSettings.lineColor}`
                                            : "2px dashed #c8d8e8",
                                          borderBottom: activeThemeSettings.borderBottom
                                            ? `${activeThemeSettings.borderWidth}px solid ${activeThemeSettings.lineColor}`
                                            : "2px dashed #c8d8e8",
                                          borderLeft: activeThemeSettings.borderLeft
                                            ? `${activeThemeSettings.borderWidth}px solid ${activeThemeSettings.lineColor}`
                                            : "2px dashed #c8d8e8",
                                        }}
                                      />
                                      <button
                                        type="button"
                                        className="theme-border-side-btn tbs-v"
                                        onClick={() => applyThemeToTargets((cur) => ({ ...cur, borderRight: !cur.borderRight }))}
                                        title="Toggle right border"
                                        style={{
                                          borderRight: activeThemeSettings.borderRight
                                            ? `${activeThemeSettings.borderWidth}px solid ${activeThemeSettings.lineColor}`
                                            : "2px dashed #b8cfe6",
                                        }}
                                      />
                                      <div />
                                      <button
                                        type="button"
                                        className="theme-border-side-btn tbs-h"
                                        onClick={() => applyThemeToTargets((cur) => ({ ...cur, borderBottom: !cur.borderBottom }))}
                                        title="Toggle bottom border"
                                        style={{
                                          borderBottom: activeThemeSettings.borderBottom
                                            ? `${activeThemeSettings.borderWidth}px solid ${activeThemeSettings.lineColor}`
                                            : "2px dashed #b8cfe6",
                                        }}
                                      />
                                      <div />
                                    </div>
                                  </div>

                                  {/* Presets */}
                                  <div className="theme-border-presets">
                                    <button type="button" className="theme-border-preset-btn"
                                      onClick={() => applyThemeToTargets((cur) => ({ ...cur, borderTop: true, borderRight: true, borderBottom: true, borderLeft: true }))}>
                                      All
                                    </button>
                                    <button type="button" className="theme-border-preset-btn"
                                      onClick={() => applyThemeToTargets((cur) => ({ ...cur, borderTop: false, borderRight: false, borderBottom: false, borderLeft: false }))}>
                                      None
                                    </button>
                                    <button type="button" className="theme-border-preset-btn"
                                      onClick={() => applyThemeToTargets((cur) => ({ ...cur, borderTop: true, borderRight: true, borderBottom: true, borderLeft: true }))}>
                                      Outside
                                    </button>
                                  </div>

                                  {/* Thickness */}
                                  <div className="theme-border-thickness">
                                    <span className="theme-border-section-label">Thickness</span>
                                    <div className="theme-border-thick-row">
                                      {([1, 1.5, 2, 2.5, 3] as const).map((w) => (
                                        <button
                                          key={w}
                                          type="button"
                                          className={`theme-border-thick-btn${activeThemeSettings.borderWidth === w ? " is-active" : ""}`}
                                          onClick={() => applyThemeToTargets((cur) => ({ ...cur, borderWidth: w }))}
                                          title={`${w}px`}
                                        >
                                          <span className="theme-border-thick-line" style={{ height: `${w}px` }} />
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Colour */}
                                  <span className="theme-border-section-label">Colour</span>
                                  <div className="theme-swatch-grid">
                                    {themeSwatches.map((swatch) => (
                                      <button
                                        key={`border-clr-${swatch}`}
                                        type="button"
                                        className={`theme-swatch${activeThemeSettings.lineColor.toLowerCase() === swatch.toLowerCase() ? " is-active" : ""}`}
                                        style={{ backgroundColor: swatch }}
                                        onClick={() => applyThemeToTargets((cur) => ({ ...cur, lineColor: swatch }))}
                                        aria-label={`Set border colour to ${swatch}`}
                                      />
                                    ))}
                                  </div>
                                  <div className="theme-color-popover-actions">
                                    <input
                                      className="theme-color-input"
                                      type="color"
                                      value={activeThemeSettings.lineColor}
                                      onChange={(e) => applyThemeToTargets((cur) => ({ ...cur, lineColor: e.target.value }))}
                                    />
                                    <button
                                      type="button"
                                      className="theme-eyedrop-button"
                                      onClick={() => pickScreenColor("lineColor")}
                                      disabled={!hasEyeDropper || activeThemeTargets.length === 0}
                                      title="Pick colour from screen"
                                      aria-label="Pick colour from screen"
                                    >
                                      <Pipette size={16} strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="theme-target-header">
                        <span className="theme-target-label-heading">Apply to</span>
                        <div className="theme-target-header-actions">
                          <button
                            type="button"
                            className="theme-target-action-btn"
                            onClick={() => setActiveThemeTargets(themeGroups.map((g) => g.key))}
                          >All</button>
                          <button
                            type="button"
                            className="theme-target-action-btn"
                            onClick={() => setActiveThemeTargets([])}
                          >None</button>
                        </div>
                      </div>
                      <div className="theme-target-list">
                        {themeGroups.map((group) => (
                          <label key={group.key} className="theme-target-check-row">
                            <input
                              type="checkbox"
                              className="theme-target-checkbox"
                              checked={activeThemeTargets.includes(group.key)}
                              onChange={() =>
                                setActiveThemeTargets((prev) =>
                                  prev.includes(group.key)
                                    ? prev.filter((k) => k !== group.key)
                                    : [...prev, group.key]
                                )
                              }
                            />
                            <span className="theme-target-check-text">{group.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

            </div>

          </div>
        </aside>
        <section className="allocation-main">
          <div className="top-bar">
              <div className="top-bar-grid">
                <div className="title" style={{ textTransform: "uppercase" }}>
                  {departmentSiteName || "Department/Site Name"}
                </div>
                <div className={`header-date${allocationDateFormat === "weekday-long" ? " header-date-long" : ""}`}>
                  {formattedDayDate}
                </div>
              </div>
            <div className="controls no-print top-controls-inline">

              {/* ── File menu ── */}
              <div className="file-menu-wrap no-print" ref={fileMenuRef}>
                <button
                  type="button"
                  className={`file-menu-trigger${fileMenuOpen ? " is-open" : ""}`}
                  onClick={() => setFileMenuOpen((v) => !v)}
                  aria-label="File options"
                  title="File options"
                >
                  {currentTemplateName && (
                    <span className="file-menu-tpl-name">{currentTemplateName}</span>
                  )}
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="2" y="4.5"  width="14" height="1.5" rx="0.75" fill="currentColor"/>
                    <rect x="2" y="8.25" width="14" height="1.5" rx="0.75" fill="currentColor"/>
                    <rect x="2" y="12"   width="14" height="1.5" rx="0.75" fill="currentColor"/>
                  </svg>
                </button>
                {fileMenuOpen && (
                  <div className="file-menu-dropdown">
                    <button type="button" className="file-menu-item" onClick={() => { handleNew(); setFileMenuOpen(false); }}>New</button>
                    <button type="button" className="file-menu-item" onClick={() => { handleSave(); setFileMenuOpen(false); }}>Save</button>
                    <button type="button" className="file-menu-item" onClick={() => { handleSaveAs(); setFileMenuOpen(false); }}>Save As…</button>
                    <button type="button" className="file-menu-item" onClick={() => { setTemplateModal("open"); setFileMenuOpen(false); }}>Open…</button>
                    <div className="file-menu-divider" />
                    <div className="file-menu-print-row">
                      <select
                        className="file-menu-print-select"
                        value={printPaper}
                        onChange={(e) => setPrintPaper(e.target.value as "A3" | "A4")}
                        aria-label="Print paper size"
                      >
                        <option value="A3">A3</option>
                        <option value="A4">A4</option>
                      </select>
                      <button type="button" className="file-menu-item file-menu-print-btn" onClick={() => { window.print(); setFileMenuOpen(false); }}>Print Preview</button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Template modal ── */}
              {templateModal !== null && (
                <div className="tpl-modal-overlay" onClick={() => setTemplateModal(null)}>
                  <div className="tpl-modal" onClick={(e) => e.stopPropagation()}>
                    {templateModal === "save" && (
                      <>
                        <div className="tpl-modal-title">Save Template As</div>
                        <input
                          className="tpl-modal-input"
                          type="text"
                          placeholder="Template name…"
                          value={saveAsName}
                          autoFocus
                          style={{
                            height: "62px",
                            minHeight: "62px",
                            padding: "0 18px",
                            borderRadius: "12px",
                            borderWidth: "2px",
                            fontSize: "18px",
                            fontWeight: 600,
                            lineHeight: "1.2",
                          }}
                          onChange={(e) => setSaveAsName(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleSaveConfirm(); if (e.key === "Escape") setTemplateModal(null); }}
                        />
                        <div className="tpl-modal-actions">
                          <button type="button" className="tpl-modal-btn tpl-modal-btn-cancel" onClick={() => setTemplateModal(null)}>Cancel</button>
                          <button type="button" className="tpl-modal-btn tpl-modal-btn-confirm" onClick={handleSaveConfirm} disabled={!saveAsName.trim()}>Save</button>
                        </div>
                      </>
                    )}
                    {templateModal === "open" && (() => {
                      const list = loadTemplateList();
                      return (
                        <>
                          <div className="tpl-modal-title">Open Template</div>
                          {list.length === 0 ? (
                            <div className="tpl-modal-empty">No saved templates yet.</div>
                          ) : (
                            <ul className="tpl-modal-list">
                              {list.map((tpl) => (
                                <li key={tpl.id} className="tpl-modal-item">
                                  <div className="tpl-modal-item-info">
                                    <span className="tpl-modal-item-name">{tpl.name}</span>
                                    <span className="tpl-modal-item-date">{new Date(tpl.savedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                                  </div>
                                  <div className="tpl-modal-item-actions">
                                    <button type="button" className="tpl-modal-btn tpl-modal-btn-confirm" onClick={() => handleLoad(tpl)}>Open</button>
                                    <button type="button" className="tpl-modal-btn tpl-modal-btn-delete" onClick={() => { deleteTemplate(tpl.id); setTemplateModal("open"); }}>Delete</button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                          <div className="tpl-modal-actions">
                            <button type="button" className="tpl-modal-btn tpl-modal-btn-cancel" onClick={() => setTemplateModal(null)}>Close</button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

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
