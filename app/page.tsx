import StealthNavbar from "./components/stealth/StealthNavbar";
import AtomicPulseHero from "./components/stealth/AtomicPulseHero";
import SentinelHealthDashboard from "./components/stealth/SentinelHealthDashboard";
import TransactionStream from "./components/stealth/TransactionStream";
import MultiTenantVault from "./components/stealth/MultiTenantVault";
import StealthFooter from "./components/stealth/StealthFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617]">
      <StealthNavbar />
      <main className="pt-16">
        <AtomicPulseHero />
        <SentinelHealthDashboard />
        <TransactionStream />
        <MultiTenantVault />
      </main>
      <StealthFooter />
    </div>
  );
}
