import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import IssueFilters from '../components/IssueFilters';
import IssueCard from '../components/IssueCard';

const IssuesView = () => {
    const issues = useLiveQuery(() => db.issues.toArray());

    if (!issues) return null;

    return (
        <div className="container">
            <IssueFilters />
            <div>
                {issues.map((issue) => (
                    <IssueCard key={issue.id} {...issue} />
                ))}
            </div>
        </div>
    );
};

export default IssuesView;
