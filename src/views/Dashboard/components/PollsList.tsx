import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { PollModel } from "~core/models";
import { getPollsCollection } from "~firebase/collections/polls-collection";

interface DashboardPollsListRowProps {
  id: string;
  data: PollModel;
}

const DashboardPollsListRow = ({ id, data }: DashboardPollsListRowProps) => (
  <TableRow>
    <TableCell>{data.title}</TableCell>
    <TableCell>{data.description}</TableCell>
    <TableCell>{data.variants.length}</TableCell>
    <TableCell>
      <Button size="small" variant="contained" color="secondary" component={Link} to={`/viewer/${id}`}>
        Переглянути
      </Button>
    </TableCell>
  </TableRow>
);

export const DashboardPollsList = () => {
  const [snapshot, loading, error] = useCollection(getPollsCollection());

  console.log(snapshot);

  return (
    <Table component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Назва</TableCell>
          <TableCell>Опис</TableCell>
          <TableCell>Кількість варіантів</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {snapshot?.docs.map((document) => (
          <DashboardPollsListRow key={document.id} id={document.id} data={document.data()} />
        ))}
      </TableBody>
    </Table>
  );
};
