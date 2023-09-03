import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../../pages/Dashboard";
import { Indicators } from "../Indicators";
import { FinancialRelations } from "../FinancialRelations";
import { DPS } from "../DPS";
import { Warrants } from "../Warrants";
import { CapitalIncreases } from "../CapitalIncrease";
import { Bonds } from "../Bonds";
type Props = {};

export const AppRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="warrants" element={<Warrants />} />
        <Route path="indicator" element={<Indicators />} />
        <Route path="financial-relations" element={<FinancialRelations />} />
        <Route path="dps" element={<DPS />} />
        <Route path="capital-increase" element={<CapitalIncreases />} />
        <Route path="bonds" element={<Bonds />} />
        <Route index element={<Navigate to="warrants" replace />} />
      </Route>
    </Routes>
  );
};
