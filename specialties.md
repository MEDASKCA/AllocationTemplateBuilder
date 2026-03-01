# Specialty Services Archive

This file preserves the current `Specialty Services` section design from the template builder so it can be moved into a separate specialty app or the actual allocation app later.

## Purpose

The current section is intended to define a generic specialty structure for a template, not final live allocation content.

## Current Builder Logic

### 1. Template Structure Setup

- Ask: `How many specialties are needed?`
- Generate generic specialty labels:
  - `Specialty A`
  - `Specialty B`
  - `Specialty C`
  - and so on
- For each specialty, ask:
  - `How many subspecialties does Specialty A need?`
  - `How many subspecialties does Specialty B need?`

### 2. Generated Generic Taxonomy

- Specialties use letters:
  - `Specialty A`
  - `Specialty B`
  - `Specialty C`
- Subspecialties use numbered suffixes:
  - `Subspecialty A.1`
  - `Subspecialty A.2`
  - `Subspecialty B.1`
  - and so on

### 3. Room-Level Template Assignment

For each room block in each unit:

- `A` = Specialty
- `B` = Subspecialty
- `C` = Session Count

Session Count options:

- `x1`
- `x2`
- `x3`
- `CLOSED`

## Current Intended Meaning

- This section defines the default specialty structure for the template.
- It should not be treated as final live operational content.
- Final real specialty names and live mappings should be handled later in the allocation app or a dedicated specialty configurator.

## Recommended Future Architecture

### Template Builder

- Header
- Units
- Room naming
- Roles
- Auxiliary groups
- Print/layout rules

### Specialty Configurator

- Define specialties
- Define subspecialties
- Define session rules
- Save reusable specialty schemas

### Allocation App

- Load the template
- Load specialty schema
- Apply live values and placeholders

## Retrieval Note

When `Specialty Services` is removed from this app, use this file as the source reference for rebuilding the feature elsewhere.

## Archived Cross-Industry Classification Framing

This is being removed from the live builder for now, but retained here for later reuse.

- Function
  - what the subunit is primarily for
  - examples: Production, Support, Inspection, Dispatch, Training
- Service
  - what service line or business stream it belongs to
  - examples: Customer Support, Field Operations, Maintenance, Fulfilment
- Specialty/Subspecialty
  - domain-specific discipline, only when relevant
  - cross-industry equivalent: often blank or replaced by a department-specific taxonomy
- Capability Tags
  - optional attributes describing what the subunit can handle
  - examples: High Capacity, Restricted Access, 24/7, Hazmat, Temperature Controlled
