"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Person, Match } from "../types";
import { PersonCard } from "../components/PersonCard";
import { DropZone } from "../components/DropZone";
import { ControlPanel } from "../components/ControlPanel";
import { MatchesList } from "../components/MatchesList";

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [activeGroup, setActiveGroup] = useState<Person[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [teamSize, setTeamSize] = useState<number>(1);

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name,
    };
    setPeople((prev) => [...prev, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  };

  const resetAll = () => {
    // Collect all people from matches and activeGroup back to people list
    const peopleInMatches = matches.flatMap(m => [...m.team1, ...m.team2]);
    const peopleInActive = [...activeGroup];

    setPeople(prev => [...prev, ...peopleInMatches, ...peopleInActive]);
    setMatches([]);
    setActiveGroup([]);
  };

  const randomizeMatches = () => {
    // Gather everyone up
    const peopleInMatches = matches.flatMap(m => [...m.team1, ...m.team2]);
    const peopleInActive = [...activeGroup];
    const allPeople = [...people, ...peopleInMatches, ...peopleInActive];

    // Shuffle
    const shuffled = allPeople.sort(() => Math.random() - 0.5);

    const newMatches: Match[] = [];
    const remainingPeople: Person[] = [];

    const groupSize = teamSize * 2;

    // Create matches
    while (shuffled.length >= groupSize) {
      const group: Person[] = [];
      for (let i = 0; i < groupSize; i++) {
        group.push(shuffled.pop()!);
      }

      // Split into two teams
      const team1 = group.slice(0, teamSize);
      const team2 = group.slice(teamSize, groupSize);

      newMatches.push({
        id: crypto.randomUUID(),
        team1,
        team2,
        createdAt: Date.now(),
      });
    }

    // Leftovers
    if (shuffled.length > 0) {
      remainingPeople.push(...shuffled);
    }

    setMatches(newMatches);
    setPeople(remainingPeople);
    setActiveGroup([]);
  };

  const unpair = (matchId: string) => {
    const matchIndex = matches.findIndex(m => m.id === matchId);
    if (matchIndex === -1) return;

    const match = matches[matchIndex];
    setMatches(prev => prev.filter(m => m.id !== matchId));
    setPeople(prev => [...prev, ...match.team1, ...match.team2]);
  };

  // --- Interaction Logic ---

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, person: Person) => {
    e.dataTransfer.setData("personId", person.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const personId = e.dataTransfer.getData("personId");
    movePersonToActive(personId);
  };

  const movePersonToActive = (personId: string) => {
    // Find person in people list
    const personIndex = people.findIndex(p => p.id === personId);
    if (personIndex === -1) return;

    const person = people[personIndex];

    // Add to active group
    const newActiveGroup = [...activeGroup, person];

    // Remove from available people
    const newPeople = [...people];
    newPeople.splice(personIndex, 1);
    setPeople(newPeople);

    checkAndFinalizeMatch(newActiveGroup);
  };

  const checkAndFinalizeMatch = (currentActive: Person[]) => {
    const requiredSize = teamSize * 2;
    // Check if match is complete
    if (currentActive.length === requiredSize) {

      const team1 = currentActive.slice(0, teamSize);
      const team2 = currentActive.slice(teamSize, requiredSize);

      const newMatch: Match = {
        id: crypto.randomUUID(),
        team1,
        team2,
        createdAt: Date.now(),
      };
      setMatches(prev => [newMatch, ...prev]);
      setActiveGroup([]); // Clear drop zone
    } else {
      setActiveGroup(currentActive);
    }
  };

  // Click interaction for mobile/desktop convenience
  const handlePersonClick = (person: Person) => {
    movePersonToActive(person.id);
  };

  const handleActivePersonClick = (person: Person) => {
    // Move back to list
    setActiveGroup(prev => prev.filter(p => p.id !== person.id));
    setPeople(prev => [...prev, person]);
  };

  // If team size changes, we might need to purge active group to avoid stuck states?
  // Simplified: If you change team size, we dump active group back to people.
  const handleSetTeamSize = (size: number) => {
    if (activeGroup.length > 0) {
      setPeople(prev => [...prev, ...activeGroup]);
      setActiveGroup([]);
    }
    setTeamSize(size);
  }


  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Pairing Up</h1>

      <ControlPanel
        teamSize={teamSize}
        setTeamSize={handleSetTeamSize}
        onAddPerson={addPerson}
        onReset={resetAll}
        onRandomize={randomizeMatches}
      />

      <div className={styles.peopleContainer}>
        {people.length === 0 && matches.length === 0 && activeGroup.length === 0 && (
          <p className={styles.emptyHint}>Add people to start pairing!</p>
        )}
        {people.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onDragStart={handleDragStart}
            onRemove={removePerson}
            onClick={handlePersonClick}
          />
        ))}
      </div>

      <DropZone
        activePair={activeGroup} // Renamed prop usage, though component prop is still activePair (we should rename it too ideally, but it works)
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onPersonClick={handleActivePersonClick}
      />

      <p className={styles.instruction}>
        {activeGroup.length} / {teamSize * 2} needed for a match ({teamSize} vs {teamSize})
      </p>

      <MatchesList matches={matches} onUnpair={unpair} />
    </main>
  );
}
