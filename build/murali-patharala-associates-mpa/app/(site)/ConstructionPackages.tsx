'use client';

import BrandText from '@/components/BrandText';
import Modal from '@/components/Modal';
import EnquiryForm from '@/components/EnquiryForm';

import { CONTACT_LINKS } from '@/lib/contactLinks';
import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Droplets,
  LayoutGrid,
  Paintbrush,
  Zap,
  AlertCircle,
  HardHat,
  Maximize2,
  UtensilsCrossed,
  Plus,
  Minus,
  MessageSquare,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  ExternalLink
} from 'lucide-react';
import ArchitecturalDiagramBg from '@/components/ArchitecturalDiagramBg';

interface SpecItem {
  label: string;
  detail: string;
}

interface SpecSection {
  title: string;
  isExclusion?: boolean;
  items: SpecItem[];
}

interface PackageData {
  id: string;
  name: string;
  tag: string;
  price: string;
  ratePerSqFt: number;
  unit: string;
  timeline: string;
  highlight: boolean;
  luxuryBadge: boolean;
  sections: SpecSection[];
}

const SUMMARY_HIGHLIGHTS: Record<string, { label: string; text: string }[]> = {
  'standard-package': [
    { label: 'Structure', text: 'Arun / GBR FE 550 TMT Steel, Wire-Cut Bricks, Ramco / Dalmia 53-Grade Cement, M20 Concrete' },
    { label: 'Flooring', text: "4'x2' Vitrified Tiles (₹65/sqft), Full Body Staircase Tile (₹110/sqft), Terrace Waterproofing" },
    { label: 'Bathroom & Plumbing', text: 'Parryware fixtures (up to ₹20,000/bath), vitrified wall tiles to ceiling, 2,000L UV Tank' },
    { label: 'Doors & Windows', text: 'Malaysian Teak main door (32mm) with frame, UPVC sliding windows with 5mm clear glass' },
    { label: 'Painting & Electrical', text: 'Nippon wall putty & Breeze emulsion, Orbit FRLS wiring, Legrand modular switches' },
    { label: 'Project Management', text: 'Dedicated daily site engineer visits, bi-weekly PM inspections, live photo updates on mobile app' },
  ],
  'premium-package': [
    { label: 'Structure', text: 'ARS / iSteel / Tata equivalent, Wire-Cut Bricks, UltraTech / Ramco Supergrade cement, RCC Lift Pit & Shaft' },
    { label: 'Flooring', text: "4'x2' Digital Vitrified Tiles (₹90/sqft Somany / Kajaria), Staircase Granite (₹160/sqft), White cooling roof tiles" },
    { label: 'Bathroom & Plumbing', text: 'Jaquar fittings (up to ₹30,000/bath), wall-hung EWCs, 3,000L Sintex UV tank with sensor, solar heater lines' },
    { label: 'Doors & Windows', text: "8'x4' Ghana Teak main door (₹52,000), flush laminate doors, UPVC sliding windows, toughened glass railing" },
    { label: 'Painting & Electrical', text: 'Birla wall putty, Asian Premium Emulsion, Apex exterior paint, Finolex / Havells FRLS wiring' },
    { label: 'Project Management', text: 'Daily Site Engineer & PM visits, dedicated architect stage-wise inspections & material styling' },
  ],
  'ultra-luxury': [
    { label: 'Structure', text: 'Tata Tiscon 550D (1.5x anti-seismic frame), 11ft ceiling heights, M25 concrete, river sand masonry' },
    { label: 'Flooring', text: "6'x6' Quartz Tiles (₹200/sqft), Imported Italian Marble Staircase (₹350/sqft), Granite car parking" },
    { label: 'Bathroom & Plumbing', text: 'Kohler Designer Collection (₹60,000/bath), concealed wall mixers, 6,000L RCC overhead tank' },
    { label: 'Doors & Windows', text: "8'x5' Designer Wood or Pure SS Security Door with Digital Lock, coloured UPVC with toughened glass" },
    { label: 'Painting & Electrical', text: 'Asian Royal Shyne / Nippon finish, touch glass plate switches, high-load provisions (Lifts, DG, EV)' },
    { label: 'Project Management', text: 'Senior resident engineer, daily PM audits, dedicated architect interior & material styling' },
  ],
};

const PACKAGES_DATA: PackageData[] = [
  {
    id: 'standard-package',
    name: 'Standard Package',
    tag: 'Essential Quality',
    price: '₹2,499',
    ratePerSqFt: 2499,
    unit: 'per sqft',
    timeline: '7 – 9 Months',
    highlight: false,
    luxuryBadge: false,
    sections: [
      {
        title: 'Project Management',
        items: [
          { label: 'Site Engineer', detail: 'Site Supervision & Quality Monitoring' },
          { label: 'Project Manager', detail: 'Visit site Twice in a Week' },
          { label: 'WhatsApp Updates', detail: 'Regular Photo Updates. Project Status Monitoring via WhatsApp' },
          { label: 'Architect', detail: 'Support Till Design Completion' },
        ],
      },
      {
        title: 'Structure',
        items: [
          { label: 'Basement Height', detail: 'Upto 3 feet' },
          { label: 'Steel', detail: 'Arun TMT / GBR or Equivalent' },
          { label: 'Wire-Cut Bricks', detail: 'For Partition walls. 9-Inch Thick Exterior Walls | 4.5 Inch Thick Inner Walls' },
          { label: 'Cement', detail: 'Ramco / Dalmia' },
          { label: 'M Sand', detail: 'Blockwork & All Masonry Works' },
          { label: 'P Sand', detail: 'Plastering Works' },
          { label: 'Concrete Grade', detail: 'M20 | RMC for Roof' },
          { label: 'Ceiling Height', detail: '10 Feet' },
          { label: 'Steel Reinforcement', detail: 'As per ARCH foundations Standard' },
          { label: 'Parapet Wall', detail: "3' Feet Height | 4.5\" Thick (Only for Floor with Headroom)" },
          { label: 'Anti-termite treatment', detail: 'Basement' },
        ],
      },
      {
        title: 'Bathroom & Plumbing',
        items: [
          { label: 'Wall Tiles', detail: "Upto Ceiling (Full Height). Size 2'X2' Vitrified Tile. Upto ₹50/Sqft. 1 Colour for 2 Bathrooms" },
          { label: 'Bath & CP Fittings', detail: 'Parryware | Upto ₹20,000 Per Bathroom | Wall Mounted EWC, Wall Mounted Wash Basin, Pillar Tap, Health Faucet, Shower Set, 2-in-1 Wall Mixer' },
          { label: 'Plumbing Pipes & Fittings', detail: 'Inner CPVC, Outer PVC. Brand: Ashirvad' },
          { label: 'Overhead Tank', detail: '2000 litres Ultratech | 3 Layered | UV Protected | White Colour' },
        ],
      },
      {
        title: 'Flooring',
        items: [
          { label: 'Living, Dining, Bedrooms & Kitchen', detail: "4'X2' | Vitrified Tiles Upto ₹65/Sqft. 1 Model for Living, Dining and Kitchen. KAG / Sunheart or Equivalent" },
          { label: 'Balcony & Utility', detail: "Size 2'X2' | Upto ₹50/Sqft | Antiskid" },
          { label: 'Staircase', detail: 'Full Body Tile : Upto ₹110/sqft' },
          { label: 'Car Parking', detail: "1'X1' Heavy Duty Tile | Upto ₹50/Sqft" },
          { label: 'Terrace Flooring', detail: 'Screed Concreting with Waterproofing' },
        ],
      },
      {
        title: 'Kitchen & Dining',
        items: [
          { label: 'Wall Tile', detail: "Vitrified Tile (2'X2') | Upto ₹55/Sqft" },
          { label: 'Sink Faucet', detail: 'Upto ₹3,000 / No' },
          { label: 'Kitchen Sink', detail: 'Stainless Steel sink with Drain Upto ₹5,000' },
          { label: 'Dining', detail: 'Wall Mounted Wash Basin' },
          { label: 'Kitchen Granite Top', detail: 'Upto ₹140/Sqft' },
        ],
      },
      {
        title: 'Door, Windows and Railing',
        items: [
          { label: 'Main Door', detail: "Malaysian Teak Door & Teak Frame - Readymade | 32mm Thickness | 5\"X3\" Thick Frame | 7' Height 3.5 Feet Width | Lock | Upto ₹30,000/no | 1 No only" },
          { label: 'Room Doors', detail: "Flush Door | Mahogany Wood Frame | 7'X3'" },
          { label: 'Bathroom Door', detail: "WPC Door & Frame | 7'X2.5'" },
          { label: 'Windows', detail: "UPVC Sliding White | Max 5' X 5' | One Window Per Room | 5mm Clear Glass" },
          { label: 'Staircase Railing', detail: 'SS 304 Grade Railing' },
          { label: 'Balcony Railing', detail: 'SS 304 Grade Railing with 8mm Toughened Glass with Posts' },
        ],
      },
      {
        title: 'Painting',
        items: [
          { label: 'Inner Wall Putty', detail: '2 coats of Wall Putty | Nippon' },
          { label: 'Wall Painting', detail: '1 coat of Primer | 2 coats of Breeze emulsion | Nippon' },
          { label: 'Ceiling Painting', detail: '1 coat of Primer | 2 coats of Breeze emulsion | Nippon' },
          { label: 'Exterior Paint', detail: '1 coat of Primer | 2 Coats of Sumo Xtra | Nippon' },
          { label: 'Elevation Putty', detail: '2 Coat of Putty for Front Elevation | Nippon Exterior Putty' },
        ],
      },
      {
        title: 'Electrical',
        items: [
          { label: 'Wires', detail: 'Orbit (FRLS)' },
          { label: 'Switches', detail: 'Legrand' },
          { label: 'Bedroom', detail: '3 Switch Box (8-Module) | One at entrance, one beside bed, one near TV' },
          { label: 'Bathroom', detail: '1 Switch Box (Inner) 4-Module, 1 Switch Box (Outer) 3-Module. Point for Heater & Exhaust' },
          { label: 'Living Room', detail: 'Upto 4 Switch Box (8 Module)' },
          { label: 'Dining', detail: '1 Switch (8-Module)' },
          { label: 'Pooja', detail: '1 Switch (3-Module)' },
          { label: 'Kitchen', detail: '3 Switch Box (6 Module). Point for HOB, Chimney, RO' },
          { label: 'Utility', detail: '1 Switch Box (4-Module)' },
          { label: 'AC Points', detail: '1 for Each Bedroom. 1 for Living Room' },
          { label: 'Entrance', detail: '1 Switch Box (6-Module)' },
          { label: 'Balconies', detail: '1 Switch Box (3-Module)' },
        ],
      },
      {
        title: "What's Not Included",
        isExclusion: true,
        items: [
          { label: 'Compound Wall', detail: 'Compound Wall @ ₹425/Sqft & Gate' },
          { label: 'Water Storage', detail: 'Sump & Septic Tank @ ₹30/Litre' },
          { label: 'Elevator', detail: 'Lift, Lift Pit and Shaft' },
          { label: 'Utilities', detail: 'Electricity Connection' },
          { label: 'Sanctions', detail: 'Building Plan Approval' },
          { label: 'Elevation Finishes', detail: 'Elevation Special Materials' },
        ],
      },
    ],
  },
  {
    id: 'premium-package',
    name: 'Premium Package',
    tag: 'Most Popular',
    price: '₹2,749',
    ratePerSqFt: 2749,
    unit: 'per sqft',
    timeline: '8 – 11 Months',
    highlight: true,
    luxuryBadge: false,
    sections: [
      {
        title: 'Project Management',
        items: [
          { label: 'Site Engineer', detail: 'Site Supervision & Quality Monitoring' },
          { label: 'Project Manager', detail: 'Daily Site Visit' },
          { label: 'WhatsApp Updates', detail: 'Regular Photo Updates. Project Status Monitoring via WhatsApp.' },
          { label: 'Architect', detail: 'Dedicated Architect throughout the Project. Stage-wise Site Visit. Material Selection Support.' },
        ],
      },
      {
        title: 'Structure',
        items: [
          { label: 'Basement Height', detail: 'Upto 3.5 feet' },
          { label: 'Steel', detail: 'ARS / iSteel / Equivalent' },
          { label: 'Wire-Cut Bricks', detail: 'For Partition walls. 9-Inch Thick Exterior Walls | 4.5 Inch Thick Inner Walls' },
          { label: 'Cement', detail: 'Ramco / Dalmia / UltraTech' },
          { label: 'M Sand', detail: 'Blockwork & All Masonry Works' },
          { label: 'P Sand', detail: 'Plastering Works' },
          { label: 'Concrete Grade', detail: 'M20 | RMC for Roof' },
          { label: 'Ceiling Height', detail: '10 Feet (FFL to FFL)' },
          { label: 'Steel Reinforcement', detail: 'As per ARCH foundations Structural Detailing.' },
          { label: 'Parapet Wall', detail: "3.5' Feet Height | 4.5\" Thick" },
          { label: 'RCC Lift Pit', detail: 'Included (If Required)' },
          { label: 'Lift Pit & Shaft', detail: 'Included (If Required)' },
          { label: 'Anti-termite treatment', detail: 'Basement' },
        ],
      },
      {
        title: 'Bathroom & Plumbing',
        items: [
          { label: 'Wall Tiles', detail: "Upto Ceiling (Full Height). 4'X2' Digital Vitrified Tile. Upto ₹85/Sqft" },
          { label: 'Bath & CP Fittings', detail: 'Jaquar | Upto ₹30,000 Per Bathroom | Wall Mounted EWC, Wall Mounted Wash Basin, Pillar Tap, Health Faucet, Shower Set, Concealed Wall Mixer' },
          { label: 'Plumbing Pipes & Fittings', detail: 'Inner CPVC, Outer PVC. Brands: Ashirvad / Finolex' },
          { label: 'Overhead Tank', detail: '3,000 litres Sintex | UV Protected | White Colour. With Sensor.' },
          { label: 'Solar Heater', detail: 'Plumbing Lines Included (If Required)' },
        ],
      },
      {
        title: 'Flooring',
        items: [
          { label: 'Living, Dining, Bedrooms & Kitchen', detail: "4'X2' | Tiles Upto ₹90/Sqft. Somany / Kajaria / KAG / Sunheart" },
          { label: 'Balcony & Utility', detail: "Size 2'X2' | Upto ₹60/Sqft" },
          { label: 'Staircase', detail: 'Granite Upto ₹160/sqft' },
          { label: 'Car Parking', detail: "2'X2' Heavy Stone | Upto ₹80/Sqft" },
          { label: 'Terrace Flooring', detail: "White Cooling Tile Size 1'X1' | Anuj | with Waterproofing" },
        ],
      },
      {
        title: 'Kitchen & Dining',
        items: [
          { label: 'Wall Tile', detail: "Vitrified Tile (4'X2') | Upto ₹65/Sqft" },
          { label: 'Sink Faucet', detail: 'Designer Brand | Upto ₹4,500 /nos' },
          { label: 'Kitchen Sink', detail: 'Quartz Sink with Drain Upto ₹7,000' },
          { label: 'Dining', detail: 'Wash Basin with Granite Counter' },
          { label: 'Kitchen Granite Top', detail: 'Upto ₹160/Sqft' },
        ],
      },
      {
        title: 'Door, Windows and Railing',
        items: [
          { label: 'Main Door', detail: "Ghana Teak Door & Teak Frame | 35mm Thickness | 5\"X3\" Thick Frame | 8' Height 4 Feet Width | Lock | Upto ₹52,000/no." },
          { label: 'Room Doors', detail: "Flush Door with Laminate | Ghana Wood Frame | 7'X3'" },
          { label: 'Bathroom Door', detail: "WPC Door & Frame | 7'X2.5'" },
          { label: 'Windows', detail: 'UPVC Sliding White - No Restriction on Size and Quantity | 5mm Clear Glass' },
          { label: 'Staircase Railing', detail: 'SS 304 Grade Railing' },
          { label: 'Balcony Railing', detail: '10mm Full Toughened Glass with 304 Grade Railing.' },
        ],
      },
      {
        title: 'Painting',
        items: [
          { label: 'Inner Wall Putty', detail: '2 coats of Wall Putty | Birla' },
          { label: 'Wall Painting', detail: '1 coat of Primer | 2 coats of Asian Premium Emulsion | Asian' },
          { label: 'Ceiling Painting', detail: '1 coat of Primer | 2 coats of Asian Premium Emulsion | Asian' },
          { label: 'Exterior Paint', detail: '1 coat of Primer | 2 Coats of Asian Apex | Asian' },
          { label: 'Elevation Putty', detail: '2 Coat of Putty for Two sides of Elevation | Birla Wallseal Waterproof' },
        ],
      },
      {
        title: 'Electrical',
        items: [
          { label: 'Wires', detail: 'Finolex / Havells (FRLS)' },
          { label: 'Switches', detail: 'GM Modular' },
          { label: 'Bedroom', detail: '4 Switch Box (8-Module)' },
          { label: 'Bathroom', detail: '1 Switch Box (Inner) 4-Module, 1 Switch Box (Outer) 3-Module. Point for Heater & Exhaust' },
          { label: 'Living Room', detail: 'Upto 5 Switch Box (8 Module)' },
          { label: 'Dining', detail: '1 Switch (8-Module)' },
          { label: 'Pooja', detail: '2 Switch (3-Module)' },
          { label: 'Kitchen', detail: '5 Switch Box (6 Module). Point for HOB, Chimney, RO' },
          { label: 'Utility', detail: '2 Switch Box (4-Module)' },
          { label: 'AC Points', detail: '1 for Each Bedroom. 1 for Living Room' },
          { label: 'Entrance', detail: '1 Switch Box (6-Module)' },
          { label: 'Balconies', detail: '1 Switch Box (3-Module)' },
          { label: 'Panel Board', detail: 'Electricity Panel Board - Single Service with RLCB - Exterior Grade' },
        ],
      },
      {
        title: "What's Not Included",
        isExclusion: true,
        items: [
          { label: 'Compound Wall', detail: 'Compound Wall @ ₹425/Sqft & Gate' },
          { label: 'Water Storage', detail: 'Sump & Septic Tank @ ₹30/Litre' },
          { label: 'Elevator', detail: 'Lift Machine & Installation' },
          { label: 'Utilities', detail: 'Electricity Connection Charges' },
          { label: 'Sanctions', detail: 'Building Plan Approval Fee' },
          { label: 'Elevation Finishes', detail: 'Elevation Special Materials' },
        ],
      },
    ],
  },
  {
    id: 'ultra-luxury',
    name: 'Ultra Luxury',
    tag: 'Signature Residence',
    price: '₹3,499',
    ratePerSqFt: 3499,
    unit: 'per sqft',
    timeline: '10 – 14 Months',
    highlight: false,
    luxuryBadge: true,
    sections: [
      {
        title: 'Project Management',
        items: [
          { label: 'Site Engineer', detail: 'Site Supervision & Quality Monitoring' },
          { label: 'Project Manager', detail: 'Daily Site Visit' },
          { label: 'WhatsApp Updates', detail: 'Regular Photo Updates. Project Status Monitoring via WhatsApp' },
          { label: 'Architect', detail: 'Dedicated Architect. Frequent Site Visit. Material & Brand Selection Support including Interiors and Home Decor.' },
        ],
      },
      {
        title: 'Structure',
        items: [
          { label: 'Basement Height', detail: 'Upto 5 feet' },
          { label: 'Steel', detail: 'TATA Steel Tiscon 550D' },
          { label: 'Wire-Cut Bricks', detail: 'For Partition walls. 9-Inch Thick Exterior Walls | 4.5 Inch Thick Inner Walls' },
          { label: 'Cement', detail: 'Ramco / Dalmia / UltraTech' },
          { label: 'River Sand', detail: 'Blockwork & All Masonry Works' },
          { label: 'Plastering Sand', detail: 'River Sand for Plastering Works' },
          { label: 'Concrete Grade', detail: 'M25 | RMC for Roof' },
          { label: 'Ceiling Height', detail: '11 Feet (FFL to FFL)' },
          { label: 'Steel Reinforcement', detail: '1.5 times Strength as per ARCH foundations Structural Drawings & Detailing by Senior Structural Engineer.' },
          { label: 'Parapet Wall', detail: "3.5' Feet Height | 4.5\" Thick (Or) Toughened Glass Railing if Required" },
          { label: 'RCC Lift Pit', detail: 'Included (If Required)' },
          { label: 'RCC Base', detail: 'RCC Concrete Slab for Base' },
          { label: 'Lift Pit & Shaft', detail: 'Included (If Required)' },
          { label: 'Anti-termite treatment', detail: 'Basement' },
        ],
      },
      {
        title: 'Bathroom & Plumbing',
        items: [
          { label: 'Wall Tiles', detail: "Upto Ceiling (Full Height). 4'X2' Vitrified Tile. Upto ₹120/Sqft" },
          { label: 'Bath & CP Fittings', detail: 'Kohler | Upto ₹60,000 Per Bathroom | Concealed EWC, Counter Top Wash Basin, Marble Counter Slab, Pillar Tap, Health Faucet, Shower Set, Concealed Wall Mixer.' },
          { label: 'Plumbing Pipes & Fittings', detail: 'Inner CPVC, Outer PVC. HDPE flexible pipe. Brands: Ashirwad / Finolex / Jindal' },
          { label: 'RCC Overhead Tank', detail: 'Upto 6,000 litres with Waterproofing.' },
          { label: 'Solar Heater', detail: 'Plumbing Lines Included (If Required)' },
        ],
      },
      {
        title: 'Flooring',
        items: [
          { label: 'Living, Dining, Bedrooms & Kitchen', detail: "6'X6' | Quartz Tiles Upto ₹200/Sqft" },
          { label: 'Balcony & Utility', detail: "Size 2'X2' | Upto ₹60/Sqft" },
          { label: 'Staircase', detail: 'Marble Upto ₹350/sqft' },
          { label: 'Car Parking', detail: 'Granite | Upto ₹120/Sqft' },
          { label: 'Terrace Flooring', detail: "2'X2' Exterior Grade Vitrified Tile (Any Grade) | with Waterproofing" },
        ],
      },
      {
        title: 'Kitchen & Dining',
        items: [
          { label: 'Wall Tile', detail: "Vitrified Designer Tile (4'X2') | Upto ₹125/Sqft" },
          { label: 'Sink Faucet', detail: 'Floor Mounted Pull-Out | Upto ₹8,000 / No' },
          { label: 'Kitchen Sink', detail: 'Multifunction Sink Upto ₹15,000' },
          { label: 'Dining', detail: 'Premium Designer Collection Wash Basin with Marble Counter and Designer Tap.' },
          { label: 'Kitchen Top', detail: 'Quartz Stone Upto ₹350/Sqft' },
        ],
      },
      {
        title: 'Door, Windows and Railing',
        items: [
          { label: 'Main Door', detail: "Designer Wood Door of Height upto 8'X5' (or) Security Steel Door of Size (8'X4.5') Pure Stainless Steel with Digital Lock." },
          { label: 'Room Doors', detail: "Flush Door with Laminate | Ghana Wood Frame | 8'X3.5'" },
          { label: 'Bathroom Doors', detail: "Water Proof Flush Door with Designer Laminates | 8'X3'" },
          { label: 'Windows', detail: 'Openable Type | UPVC Coloured | No Restriction on Size and Quantity | Toughened Glass' },
          { label: 'Staircase Railing', detail: 'Toughened Glass with SS or Wood Railing or Aluminium' },
          { label: 'Balcony Railing', detail: '10mm Full Toughened Glass with Aluminium Railing.' },
        ],
      },
      {
        title: 'Painting',
        items: [
          { label: 'Inner Wall Putty', detail: '2 coats of Wall Putty | Birla' },
          { label: 'Wall Painting', detail: '1 coat of Primer | 2 coats of Royal Shyne | Asian' },
          { label: 'Ceiling Painting', detail: '1 coat of Primer | 2 coats of Royal Shyne | Nippon' },
          { label: 'Exterior Paint', detail: '1 coat of Primer | 2 Coats of Apex Ultima ProteK | Asian' },
          { label: 'Elevation Putty', detail: '2 Coat of Putty for All sides of Elevation | Birla Wallseal Waterproofing' },
        ],
      },
      {
        title: 'Electrical',
        items: [
          { label: 'Wires', detail: 'Finolex / Havells (FRLS)' },
          { label: 'Switches', detail: 'Touch Switches with Glass Plates.' },
          { label: 'Heavy Power Provision', detail: 'Required power points provided for Lifts, DG, Curtain Motors, Swimming Pool, RO Plant, Pressure Pump, Intercom, Surveillance System, Exterior Light Points, Gate Automation, Lightning Arrester, Hybrid Solar Heater, Water Fountain, HVAC Systems.' },
          { label: 'Panel Board', detail: 'Electricity Panel Board - Upto 2 Service Connection with RLCB Exterior Grade' },
        ],
      },
      {
        title: "What's Not Included",
        isExclusion: true,
        items: [
          { label: 'Compound Wall', detail: 'Compound Wall @ ₹425/Sqft & Gate' },
          { label: 'Water Storage', detail: 'Sump & Septic Tank @ ₹30/Litre' },
          { label: 'Elevator', detail: 'Lift Machine & Installation' },
          { label: 'Utilities', detail: 'Electricity Connection Charges' },
          { label: 'Sanctions', detail: 'Building Plan Approval Fee' },
          { label: 'Elevation Finishes', detail: 'Elevation Special Materials' },
        ],
      },
    ],
  },
];

const SECTION_ICONS: Record<string, any> = {
  'Project Management': HardHat,
  'Structure': Building2,
  'Bathroom & Plumbing': Droplets,
  'Flooring': LayoutGrid,
  'Kitchen & Dining': UtensilsCrossed,
  'Door, Windows and Railing': Maximize2,
  'Painting': Paintbrush,
  'Electrical': Zap,
  "What's Not Included": AlertCircle,
};

interface ConstructionPackagesProps {
  phone?: string;
  variant?: 'simple' | 'full';
}

export default function ConstructionPackages({
  phone = '98410 98490',
  variant = 'full',
}: ConstructionPackagesProps) {
  // Store open state for each package & section: "pkgIndex-secIndex": boolean
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PACKAGES_DATA.forEach((pkg, pkgIdx) => pkg.sections.forEach((section, secIdx) => {
      if (section.isExclusion) initial[`${pkgIdx}-${secIdx}`] = true;
    }));
    return initial;
  });

  // Modal state
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleSection = (pkgIdx: number, secIdx: number) => {
    const key = `${pkgIdx}-${secIdx}`;
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const expandAllForPackage = (pkgIdx: number) => {
    const newOpens: Record<string, boolean> = { ...openSections };
    const pkg = PACKAGES_DATA[pkgIdx];
    pkg.sections.forEach((_, sIdx) => {
      newOpens[`${pkgIdx}-${sIdx}`] = true;
    });
    setOpenSections(newOpens);
  };

  const collapseAllForPackage = (pkgIdx: number) => {
    const newOpens: Record<string, boolean> = { ...openSections };
    const pkg = PACKAGES_DATA[pkgIdx];
    pkg.sections.forEach((_, sIdx) => {
      newOpens[`${pkgIdx}-${sIdx}`] = false;
    });
    setOpenSections(newOpens);
  };

  const isAllExpanded = (pkgIdx: number) => {
    const pkg = PACKAGES_DATA[pkgIdx];
    return pkg.sections.every((_, sIdx) => openSections[`${pkgIdx}-${sIdx}`]);
  };

  const handleOpenModal = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <section id="packages" className="relative py-24 md:py-32 px-6 md:px-12 border-b border-[#202B29]/15 bg-surface-pale overflow-hidden">
      {/* Quiet Architectural Facade Linework Watermark */}
      <ArchitecturalDiagramBg variant="elevation" theme="light" opacity={0.10} showGrid={false} showCornerMarks={false} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading - Clean & Spacious */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A94F2D]" />
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#777777]">
              SPECIFICATION SCHEDULE &bull; 2026
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#202B29] tracking-tight"
            style={{ fontFamily: "var(--font-content)" }}
          >
            Our Home Construction Packages
          </h2>
          <p className="text-sm md:text-base text-[#666666] font-normal leading-relaxed">
            {variant === 'simple'
              ? 'Transparent turnkey construction benchmarks with legally binding price freeze guarantees and branded materials.'
              : 'Itemized Bill of Quantities (BOQ). Fixed rate per sq.ft with branded material benchmarks across 9 distinct categories.'}
          </p>
          <span className="text-[11px] font-mono text-ink-muted block pt-1">
            * Minimum overall built-up area: 2,000 sq.ft &bull; Zero escalation guarantee
          </span>
        </div>

        {/* 3 Package Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {PACKAGES_DATA.map((pkg, pkgIdx) => {
            const allOpen = isAllExpanded(pkgIdx);
            const highlights = SUMMARY_HIGHLIGHTS[pkg.id] || [];
            const headerTags: Record<string, { label: string; sub: string }> = {
              'standard-package': { label: '01 // ESSENTIAL', sub: '2,000–3,500 SQ.FT' },
              'premium-package': { label: '02 // MOST REQUESTED', sub: 'FULL TURNKEY' },
              'ultra-luxury': { label: '03 // SIGNATURE', sub: 'BESPOKE RESIDENCE' },
            };
            const tagInfo = headerTags[pkg.id] || { label: `0${pkgIdx + 1} // SPEC`, sub: 'TURNKEY' };

            return (
              <div
                key={pkg.id}
                className={`mpa-package-tier border flex flex-col transition-all duration-300 ${
                  pkg.highlight
                    ? 'bg-surface-linen text-[#302A20] border-2 border-[#A94F2D] shadow-sm relative'
                    : 'bg-surface-cream text-[#202B29] border-[#202B29]/15 hover:border-[#A94F2D]/50 shadow-sm'
                }`}
              >
                {/* Architectural Tag Header Ribbon */}
                <div
                  className={`px-6 py-3 flex items-center justify-between border-b text-[10px] font-mono font-bold tracking-widest ${
                    pkg.highlight
                      ? 'bg-[#A94F2D] text-white border-[#A94F2D]'
                      : pkg.luxuryBadge
                      ? 'bg-surface-linen text-[#703015] border-[#26342F]'
                      : 'bg-surface-cream text-[#666666] border-[#D8CFC1]'
                  }`}
                >
                  <span>{tagInfo.label}</span>
                  <span className="opacity-80 font-normal">{tagInfo.sub}</span>
                </div>

                {/* Card Header & Pricing */}
                <div className="p-6 md:p-8 space-y-4 border-b border-current/10">
                  <h3
                    className="text-2xl sm:text-3xl font-bold font-serif"
                    style={{ fontFamily: "var(--font-content)" }}
                  >
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span
                      className={`text-4xl sm:text-5xl font-bold font-serif ${
                        pkg.highlight ? 'text-[#703015]' : 'text-[#202B29]'
                      }`}
                      style={{ fontFamily: "var(--font-content)" }}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        pkg.highlight ? 'text-ink-muted' : 'text-[#666666]'
                      }`}
                    >
                      {pkg.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium pt-1">
                    <span className={pkg.highlight ? 'text-ink-muted' : 'text-[#777777]'}>
                      Estimated Execution:
                    </span>
                    <span className={`font-mono font-bold ${pkg.highlight ? 'text-[#703015]' : 'text-[#202B29]'}`}>
                      {pkg.timeline}
                    </span>
                  </div>

                  {/* Section indicator / Expand control */}
                  {variant === 'full' && (
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span
                        className={`uppercase tracking-wider font-bold ${
                          pkg.highlight ? 'text-ink-muted' : 'text-[#777777]'
                        }`}
                      >
                        9 Specification Areas
                      </span>
                      <button
                        type="button"
                        onClick={() => (allOpen ? collapseAllForPackage(pkgIdx) : expandAllForPackage(pkgIdx))}
                        className={`border px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                          pkg.highlight ? 'border-[#F3B687] text-[#703015] hover:bg-[#F3B687] hover:text-[#202B29]' : 'border-[#202B29]/40 text-[#202B29] hover:bg-surface-linen hover:text-[#302A20]'
                        }`}
                      >
                        {allOpen ? 'Collapse All' : 'Expand All'}
                      </button>
                    </div>
                  )}
                </div>

                {/* ── VARIANT 1: SIMPLE MODE (For Homepage) ── */}
                {variant === 'simple' ? (
                  <div className="p-6 md:p-8 space-y-4 flex-1">
                    <p
                      className={`text-xs font-bold uppercase tracking-widest ${
                        pkg.highlight ? 'text-[#703015]' : 'text-[#202B29]'
                      }`}
                    >
                      Key Material Benchmarks:
                    </p>

                    <div className="space-y-3.5">
                      {highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="text-xs leading-relaxed">
                          <span
                            className={`font-bold uppercase text-[10px] tracking-wider block ${
                              pkg.highlight ? 'text-[#703015]' : 'text-[#A94F2D]'
                            }`}
                          >
                            ■ {hl.label}
                          </span>
                          <span className={`font-medium ${pkg.highlight ? 'text-ink-muted' : 'text-[#2B2D31]'}`}>
                            {hl.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ── VARIANT 2: FULL MODE (For Services Page with all 9 Collapsibles) ── */
                  <div className="p-4 md:p-6 space-y-3 flex-1">
                    {pkg.sections.map((section, secIdx) => {
                      const isOpen = !!openSections[`${pkgIdx}-${secIdx}`];
                      const IconComponent = SECTION_ICONS[section.title] || Building2;
                      const isExclusion = section.isExclusion;

                      return (
                        <div
                          key={secIdx}
                          className={`border-2 transition-all ${
                            pkg.highlight
                              ? isExclusion
                                ? 'border-red-500/40 bg-red-50'
                                : isOpen
                                ? 'border-[#F3B687]/70 bg-surface-linen'
                                : 'border-[#5D5140]/25 bg-surface-cream/5 hover:border-[#5D5140]/25'
                              : isExclusion
                              ? 'border-amber-400 bg-amber-50/70'
                              : isOpen
                              ? 'border-[#202B29] bg-surface-cream shadow-sm'
                              : 'border-[#D8CFC1] bg-surface-cream hover:border-[#B6A999]'
                          }`}
                        >
                          {/* Section Accordion Trigger */}
                          <button
                            type="button"
                            onClick={() => toggleSection(pkgIdx, secIdx)}
                            className="w-full px-4 py-3.5 flex items-center justify-between text-left group"
                            aria-expanded={isOpen}
                          >
                            <div className="flex items-center gap-3 pr-2">
                              <span
                                className={`p-1.5 rounded-sm flex items-center justify-center shrink-0 ${
                                  isExclusion
                                    ? pkg.highlight
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-amber-100 text-amber-800'
                                    : pkg.highlight
                                    ? 'bg-[#F3B687]/15 text-[#703015]'
                                    : 'bg-surface-linen text-[#302A20]'
                                }`}
                              >
                                <IconComponent className="w-4 h-4" />
                              </span>
                              <div>
                                <span
                                  className={`text-xs sm:text-sm font-bold tracking-tight block ${
                                    isExclusion
                                      ? pkg.highlight
                                        ? 'text-red-400'
                                        : 'text-red-700'
                                      : pkg.highlight
                                      ? 'text-[#302A20]'
                                      : 'text-[#202B29]'
                                  }`}
                                >
                                  {section.title}
                                </span>
                                <span
                                  className={`text-[10px] block ${
                                    pkg.highlight ? 'text-ink-muted' : 'text-ink-muted'
                                  }`}
                                >
                                  {section.items.length} {section.items.length === 1 ? 'specification' : 'specifications'}
                                </span>
                              </div>
                            </div>

                            <span
                              className={`w-6 h-6 flex items-center justify-center rounded-full shrink-0 transition-transform duration-200 ${
                                pkg.highlight
                                  ? 'bg-surface-cream/10 text-[#302A20] group-hover:bg-[#F3B687] group-hover:text-[#202B29]'
                                  : 'bg-surface-cream text-[#202B29] group-hover:bg-surface-linen group-hover:text-[#302A20]'
                              }`}
                            >
                              {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </span>
                          </button>

                          {/* Collapsed Items Content */}
                          {isOpen && (
                            <div
                              className={`px-4 pb-4 pt-1 border-t text-xs leading-relaxed space-y-2.5 ${
                                pkg.highlight
                                  ? 'border-[#5D5140]/25 text-ink-muted'
                                  : 'border-[#EFE7DA] text-[#333333]'
                              }`}
                            >
                              {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex items-start gap-2 pt-1">
                                  <span
                                    className={`font-bold mt-0.5 shrink-0 ${
                                      isExclusion
                                        ? 'text-red-500'
                                        : pkg.highlight
                                        ? 'text-[#703015]'
                                        : 'text-[#A94F2D]'
                                    }`}
                                  >
                                    {isExclusion ? '✕' : '■'}
                                  </span>
                                  <div className="text-xs">
                                    {item.label && (
                                      <strong
                                        className={`font-bold mr-1.5 ${
                                          pkg.highlight ? 'text-[#302A20]' : 'text-[#202B29]'
                                        }`}
                                      >
                                        {item.label}:
                                      </strong>
                                    )}
                                    <span className={pkg.highlight ? 'text-ink-muted' : 'text-[#444444]'}>
                                      <BrandText>{item.detail}</BrandText>
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Card Action Button (Single Clear Action) */}
                <div className="p-6 md:p-8 pt-2 mt-auto">
                  {variant === 'simple' ? (
                    <Link
                      href="/construction-package#packages"
                      className={`mpa-outline-cta w-full ${pkg.highlight ? 'mpa-outline-cta--accent' : ''}`}
                    >
                      <span>View Full Specifications</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenModal(pkg)}
                      className={`mpa-outline-cta w-full ${pkg.highlight ? 'mpa-outline-cta--accent' : ''}`}
                    >
                      <span>Get Detailed Specification</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        {variant === 'simple' ? (
          <div className="mt-14 p-6 sm:p-8 border border-[#5D5140]/25 bg-surface-linen text-[#302A20] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
            <ArchitecturalDiagramBg variant="master-plan" theme="light" opacity={0.2} showCornerMarks={false} showGrid={false} />
            <div className="space-y-1 relative z-10 max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#703015] block">
                Expert Consultation
              </span>
              <h4
                className="text-lg sm:text-2xl font-bold font-serif text-[#302A20]"
                style={{ fontFamily: "var(--font-content)" }}
              >
                Planning a custom home or multi-level villa?
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted font-medium">
                Talk directly with our licensed architectural and structural engineers for plot feasibility and soil testing insights.
              </p>
            </div>

            <a
              href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent(
                'Hi ARCH foundations, I am planning a custom residential construction project in Chennai and would like to discuss my plot requirements.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 px-5 py-3 bg-[#25D366] text-white hover:bg-[#1EBE5D] text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Principal Architect &rarr;</span>
            </a>
          </div>
        ) : (
          <div className="mt-14 p-6 sm:p-8 border-4 border-[#202B29] bg-surface-cream flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-linen text-[#703015] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4
                  className="text-lg sm:text-xl font-bold font-serif text-[#202B29]"
                  style={{ fontFamily: "var(--font-content)" }}
                >
                  100% Price Freeze &amp; Itemized BOQ Contract
                </h4>
                <p className="text-xs sm:text-sm text-[#666666] font-medium">
                  No hidden contractor surcharges. Zero material price escalation during active construction.
                </p>
              </div>
            </div>

            <a
              href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent(
                'Hi ARCH foundations, I would like to schedule a site feasibility survey in Chennai for my residential plot.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mpa-outline-cta shrink-0"
            >
              Schedule Site Survey
            </a>
          </div>
        )}
      </div>

      {/* ── Detailed Specification Request Modal ── */}
      {isModalOpen && selectedPackage && (
        <Modal label={`${selectedPackage.name} — detailed specification enquiry`} onClose={handleCloseModal}>
          <div
            className="bg-surface-cream border-4 border-[#202B29] relative"
          >
            {/* Modal Header */}
            <div className="bg-surface-linen text-[#302A20] p-4 pr-14 sm:p-6 sm:pr-16 sticky top-0 z-10">
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 min-h-11 min-w-11 flex items-center justify-center text-ink-muted hover:text-[#302A20] p-2 rounded-full hover:bg-surface-cream/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#703015] mb-1">
                DETAILED BOQ SPECIFICATION
              </p>
              <h3
                className="text-2xl font-bold font-serif"
                style={{ fontFamily: "var(--font-content)" }}
              >
                {selectedPackage.name}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Fixed Rate: <strong className="text-[#703015]">{selectedPackage.price} {selectedPackage.unit}</strong> &bull; Execution: {selectedPackage.timeline}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-3 sm:p-6 space-y-6">
              <p className="text-sm leading-relaxed text-ink-muted">
                Request the detailed specification for <strong>{selectedPackage.name}</strong>.
                Include the package name, plot location and approximate built-up area in your message.
              </p>
              <EnquiryForm />
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
