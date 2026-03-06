import { Vector3 } from 'three';

export enum AppRoute {
  HOME = '/',
  JOURNEY = '/journey',
  PORTFOLIO = '/portfolio',
  STORE = '/store',
  BOOKING = '/booking',
  CONTACT = '/contact',
}

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
}

export interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  tag: string;
  includes: string[]; // List of deliverables/features
  // New fields for Page Level Content
  longDescription?: string;
  features?: string[];
  techSpecs?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  descriptionShort: string;
  descriptionLong: string;
  techStack: string[];
  features: string[];
  links: {
    demo: string;
    repo: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  calHandle: string;
  isPopular?: boolean;
  category: 'Clients' | 'Developers';
  features: string[];
}