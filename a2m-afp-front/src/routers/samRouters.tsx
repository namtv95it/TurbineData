
import RoleGuard from "../guard/roleGuard";
import Sam0101 from "../components/pages/sam/sam0101/Sam0101";
import Sam0102 from "../components/pages/sam/sam0102/Sam0102";
import Sam0103 from "../components/pages/sam/sam0103/Sam0103";
import Sam0103V from "../components/pages/sam/sam0103/Sam0103V";
import Sam0104 from "../components/pages/sam/sam0104/Sam0104";
import HighChartsSample from "../components/pages/sam/sam0105/HighChartsSample";
import Sam0106 from "../components/pages/sam/sam0106/Sam0106";
import Sam0107 from "../components/pages/sam/sam0107/Sam0107";
import Sam0108 from "../components/pages/sam/sam0108/Sam0108";
import Markdown from "../components/pages/sam/markdown/Markdown";
import ButtonSample from "../components/pages/sam/sam0102/ButtonSample";
import InputSample from "../components/pages/sam/sam0102/InputSample";
import IconsSample from "../components/pages/sam/sam0102/IconsSample";
import SelectSample from "../components/pages/sam/sam0102/SelectSample";
import DateSample from "../components/pages/sam/sam0102/DateSample";
import TableSample from "../components/pages/sam/sam0102/TableSample";
import GridSample from "../components/pages/sam/sam0102/GridSample";
import LineCharts from "../components/pages/sam/sam0105/component/js/LineCharts";
import StockCharts from "../components/pages/sam/sam0105/component/stock/StockCharts";


export const samRouters: any = [
    { path: "sam/sam0101", element: <RoleGuard><Sam0101 /></RoleGuard> },
    {
        path: "sam/sam0102", element: <RoleGuard><Sam0102 /></RoleGuard>, children: [
            { path: "button-sample", element: <ButtonSample /> },
            { path: "input-sample", element: <InputSample /> },
            { path: "icon-sample", element: <IconsSample /> },
            { path: "select-sample", element: <SelectSample /> },
            { path: "date-sample", element: <DateSample /> },
            { path: "table-sample", element: <TableSample /> },
            { path: "grid-sample", element: <GridSample /> },
        ]
    },
    { path: "sam/sam0103", element: <RoleGuard><Sam0103 /></RoleGuard> },
    { path: "sam/sam0103/:qa", element: <RoleGuard><Sam0103V /></RoleGuard> },
    { path: "sam/sam0104", element: <RoleGuard><Sam0104 /></RoleGuard> },
    {
        path: "sam/sam0105", element: <RoleGuard><HighChartsSample /></RoleGuard>, children: [
            { path: "js-charts", element: <LineCharts /> },
            { path: "stock-charts", element: <StockCharts /> },
        ]
    },
    { path: "sam/sam0106", element: <RoleGuard><Sam0106 /></RoleGuard> },
    { path: "sam/sam0107", element: <RoleGuard><Sam0107 /></RoleGuard> },
    { path: "sam/sam0108", element: <RoleGuard><Sam0108 /></RoleGuard> },
    { path: "sam/sam0109", element: <RoleGuard><Markdown /></RoleGuard> }
]