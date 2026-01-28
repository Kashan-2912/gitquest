import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { WidgetGenerator } from "./widget-generator";

export const metadata: Metadata = {
  title: "GitHub README Widget - GitQuest",
  description: "Add your GitQuest creature to your GitHub profile README with an embeddable widget.",
};

export default function WidgetPage() {
  return (
    <main className="min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">🐉 GitHub README Widget</h1>
          <p className="text-muted-foreground text-lg">
            Showcase your GitQuest creature on your GitHub profile
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
          <WidgetGenerator />
        </Suspense>

        {/* Instructions Section */}
        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">📝 How to Add to Your GitHub Profile</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>
                First, make sure you have <Link href="/summon" className="text-primary hover:underline">summoned your creature</Link>
              </li>
              <li>
                Create a repository with the same name as your GitHub username (if you haven&apos;t already)
              </li>
              <li>
                Add or edit the <code className="bg-muted px-2 py-1 rounded text-sm">README.md</code> file in that repository
              </li>
              <li>
                Copy the Markdown code above and paste it into your README
              </li>
              <li>
                Commit and push — your creature will now appear on your profile!
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">✨ Widget Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-2xl">🎨</span>
                <div>
                  <h3 className="font-medium">Dynamic Theming</h3>
                  <p className="text-sm text-muted-foreground">Colors adapt to your creature&apos;s power tier</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-medium">Live Stats</h3>
                  <p className="text-sm text-muted-foreground">Shows contributions, CR, and power level</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-2xl">🖼️</span>
                <div>
                  <h3 className="font-medium">Creature Portrait</h3>
                  <p className="text-sm text-muted-foreground">Displays your unique AI-generated creature</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-medium">Auto-Updates</h3>
                  <p className="text-sm text-muted-foreground">Widget refreshes when you re-summon</p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">🏆 Power Tiers</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              {[
                { tier: "Mythic", color: "bg-purple-500", contributions: "5001+" },
                { tier: "Legendary", color: "bg-gray-400", contributions: "4001-5000" },
                { tier: "Epic", color: "bg-amber-500", contributions: "2501-4000" },
                { tier: "Heroic", color: "bg-blue-500", contributions: "1501-2500" },
                { tier: "Dangerous", color: "bg-red-500", contributions: "751-1500" },
                { tier: "Formidable", color: "bg-orange-500", contributions: "301-750" },
                { tier: "Trained", color: "bg-green-500", contributions: "151-300" },
                { tier: "Minor", color: "bg-teal-500", contributions: "50-150" },
                { tier: "Harmless", color: "bg-slate-500", contributions: "1-49" },
                { tier: "Unknown", color: "bg-gray-500", contributions: "0" },
              ].map(({ tier, color, contributions }) => (
                <div key={tier} className="flex items-center gap-2 p-2 rounded bg-muted/30">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <div>
                    <div className="font-medium">{tier}</div>
                    <div className="text-xs text-muted-foreground">{contributions}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
