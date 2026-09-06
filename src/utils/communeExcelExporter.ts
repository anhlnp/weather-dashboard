/**
 * Export Detailed Commune-Level Flight Condition Report to Microsoft Excel (.xls XML SpreadsheetML)
 * Phân cấp theo Đơn vị Hành chính mới: Mô hình 34 Tỉnh Thành Việt Nam (Tỉnh Gia Lai mới)
 * 100% Formal - Không Icon - Không Emoji - Chuẩn mực Báo cáo Hành chính In ấn
 */

import type { DistrictWeatherData, FlightThresholds, FlightCondition } from "../types/weather";
import { GIA_LAI_DISTRICTS, NEW_PROVINCE_SHORT_NAME, REGION_LABELS } from "./locations";

function escapeXml(str: string | number | null | undefined): string {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateCommuneExcelStyles(): string {
  return `
  <Styles>
    <!-- Default / Base Normal Style -->
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Center"/>
      <Borders/>
      <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Color="#1A202C"/>
      <Interior/>
      <NumberFormat/>
      <Protection/>
    </Style>

    <!-- Agency Top Banner -->
    <Style ss:ID="AgencyHeader">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
      <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Bold="1" ss:Color="#4A5568"/>
    </Style>

    <!-- Main Title Banner -->
    <Style ss:ID="MainTitle">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Segoe UI" ss:Size="13" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#1A365D" ss:Pattern="Solid"/>
    </Style>

    <!-- Subtitle Banner -->
    <Style ss:ID="SubTitle">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Segoe UI" ss:Size="10" ss:Bold="1" ss:Italic="1" ss:Color="#E2E8F0"/>
      <Interior ss:Color="#2B6CB0" ss:Pattern="Solid"/>
    </Style>

    <!-- Metadata Section -->
    <Style ss:ID="MetaLabel">
      <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Bold="1" ss:Color="#2D3748"/>
      <Interior ss:Color="#F7FAFC" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="MetaVal">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Color="#1A202C"/>
      <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>

    <!-- Level 1 Table Header -->
    <Style ss:ID="TableHeaderL1">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#2B6CB0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#2B6CB0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#4299E1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#4299E1"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#2B6CB0" ss:Pattern="Solid"/>
    </Style>

    <!-- Level 2 Table Header -->
    <Style ss:ID="TableHeaderL2">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#2B6CB0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Bold="1" ss:Color="#2D3748"/>
      <Interior ss:Color="#EDF2F7" ss:Pattern="Solid"/>
    </Style>

    <!-- Region Group Header -->
    <Style ss:ID="RegionHeader">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1.5" ss:Color="#2B6CB0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1.5" ss:Color="#2B6CB0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="10.5" ss:Bold="1" ss:Color="#1A365D"/>
      <Interior ss:Color="#E2E8F0" ss:Pattern="Solid"/>
    </Style>

    <!-- District Group Header Banner -->
    <Style ss:ID="DistrictHeader">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#90CDF4"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#90CDF4"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Bold="1" ss:Color="#2B6CB0"/>
      <Interior ss:Color="#EBF8FF" ss:Pattern="Solid"/>
    </Style>

    <!-- Flight Condition Cells (Formal Pastel - Pure Numbers, NO ICONS) -->
    <!-- GO: Pastel Mint Green (#C6F6D5) with Dark Forest Green text (#1C4924) -->
    <Style ss:ID="CellGo">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Bold="1" ss:Color="#1C4924"/>
      <Interior ss:Color="#C6F6D5" ss:Pattern="Solid"/>
    </Style>

    <!-- CAUTION: Pastel Warm Amber (#FEEBC8) with Deep Brown-Amber text (#7B341E) -->
    <Style ss:ID="CellCaution">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Bold="1" ss:Color="#7B341E"/>
      <Interior ss:Color="#FEEBC8" ss:Pattern="Solid"/>
    </Style>

    <!-- NO_GO: Soft Pale Rose (#FED7D7) with Dark Red text (#9B2C2C) -->
    <Style ss:ID="CellNoGo">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Bold="1" ss:Color="#9B2C2C"/>
      <Interior ss:Color="#FED7D7" ss:Pattern="Solid"/>
    </Style>

    <!-- Neutral Standard Cells -->
    <Style ss:ID="CellNormal">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Color="#2D3748"/>
    </Style>

    <Style ss:ID="CellCenter">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Color="#2D3748"/>
    </Style>

    <Style ss:ID="CellNumber">
      <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Color="#2D3748"/>
      <NumberFormat ss:Format="#,##0.0"/>
    </Style>

    <!-- Subtotal Row Style -->
    <Style ss:ID="CellSubtotal">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#4A5568"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Bold="1" ss:Color="#1A365D"/>
      <Interior ss:Color="#EDF2F7" ss:Pattern="Solid"/>
    </Style>

    <Style ss:ID="CellSubtotalLeft">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#4A5568"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E0"/>
      </Borders>
      <Font ss:FontName="Segoe UI" ss:Size="9" ss:Bold="1" ss:Color="#1A365D"/>
      <Interior ss:Color="#EDF2F7" ss:Pattern="Solid"/>
    </Style>

    <!-- Legend Label Style -->
    <Style ss:ID="LegendText">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
      <Font ss:FontName="Segoe UI" ss:Size="8.5" ss:Color="#4A5568"/>
    </Style>

    <!-- Sign-off Block Styles -->
    <Style ss:ID="SignHeader">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Bold="1" ss:Color="#1A202C"/>
    </Style>
    <Style ss:ID="SignNote">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Segoe UI" ss:Size="8.5" ss:Italic="1" ss:Color="#718096"/>
    </Style>
  </Styles>
  `;
}

/**
 * Generate Commune Detailed Matrix Worksheet XML
 */
function generateCommuneDetailedWorksheetXml(
  data: Map<string, DistrictWeatherData>,
  options?: {
    districtIdFilter?: string;
    thresholds?: FlightThresholds;
  }
): string {
  const { districtIdFilter, thresholds } = options || {};

  // Extract unique dates from first available district
  let dates: { date: string; dayOfWeek: string }[] = [];
  for (const dwd of data.values()) {
    dates = dwd.daySummaries.map((s) => ({ date: s.date, dayOfWeek: s.dayOfWeek }));
    break;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Filter districts if specified
  const targetDistricts = districtIdFilter
    ? GIA_LAI_DISTRICTS.filter((d) => d.id === districtIdFilter)
    : GIA_LAI_DISTRICTS;

  const totalCols = 5 + dates.length * 2 + 4; // 23 columns
  const mergeSpan = totalCols - 1;

  // Group districts by region
  const giaLaiDistricts = targetDistricts.filter((d) => d.region === "gia_lai");
  const binhDinhDistricts = targetDistricts.filter((d) => d.region === "binh_dinh");

  const regions = [
    {
      id: "gia_lai",
      label: "KHU VỰC GIA LAI (17 ĐƠN VỊ CẤP HUYỆN)",
      districts: giaLaiDistricts,
    },
    {
      id: "binh_dinh",
      label: "KHU VỰC BÌNH ĐỊNH (11 ĐƠN VỊ CẤP HUYỆN)",
      districts: binhDinhDistricts,
    },
  ].filter((r) => r.districts.length > 0);

  let globalCommuneCounter = 0;

  return `
  <Worksheet ss:Name="${escapeXml(districtIdFilter ? "Chi tiet xa " + (targetDistricts[0]?.name || "") : "Chi tiet cap xa 7 ngay")}">
    <Table ss:DefaultRowHeight="22">
      <Column ss:Width="45"/>  <!-- STT -->
      <Column ss:Width="110"/> <!-- Tỉnh/TP (Mới) -->
      <Column ss:Width="105"/> <!-- Khu vực -->
      <Column ss:Width="115"/> <!-- Quận/Huyện/TX -->
      <Column ss:Width="135"/> <!-- Xã/Phường/TT -->
      <!-- 14 Columns for 7 Days (Morning / Afternoon) -->
      ${dates.map(() => `<Column ss:Width="65"/>\n      <Column ss:Width="65"/>`).join("\n      ")}
      <Column ss:Width="90"/>  <!-- Tổng giờ bay -->
      <Column ss:Width="85"/>  <!-- Số ca đạt -->
      <Column ss:Width="80"/>  <!-- Tỷ lệ (%) -->
      <Column ss:Width="180"/> <!-- Đánh giá & Khuyến nghị -->

      <!-- Formal Administrative Heading -->
      <Row ss:Height="20">
        <Cell ss:MergeAcross="3" ss:StyleID="AgencyHeader">
          <Data ss:Type="String">ĐƠN VỊ VẬN HÀNH: VDCD FLIGHT OPERATIONS SYSTEM</Data>
        </Cell>
        <Cell ss:MergeAcross="${mergeSpan - 4}" ss:StyleID="AgencyHeader">
          <Data ss:Type="String">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM — Độc lập - Tự do - Hạnh phúc</Data>
        </Cell>
      </Row>
      <Row ss:Height="26">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="MainTitle">
          <Data ss:Type="String">BÁO CÁO CHI TIẾT KẾ HOẠCH ĐIỀU KIỆN BAY THEO CA (7 NGÀY) — CẤP HUYỆN &amp; XÃ/PHƯỜNG</Data>
        </Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="SubTitle">
          <Data ss:Type="String">PHÂN CẤP THEO ĐƠN VỊ HÀNH CHÍNH MỚI: ${escapeXml(NEW_PROVINCE_SHORT_NAME.toUpperCase())} (MÔ HÌNH 34 TỈNH THÀNH VIỆT NAM)</Data>
        </Cell>
      </Row>
      <Row ss:Height="6"/>

      <!-- Metadata Box -->
      <Row ss:Height="20">
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Thời gian trích xuất:</Data></Cell>
        <Cell ss:MergeAcross="2" ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(dateStr)}</Data></Cell>
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Nguồn khí tượng:</Data></Cell>
        <Cell ss:MergeAcross="3" ss:StyleID="MetaVal"><Data ss:Type="String">Open-Meteo High-Resolution Hourly Forecast API (7 ngày)</Data></Cell>
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Tiêu chuẩn bay an toàn:</Data></Cell>
        <Cell ss:MergeAcross="${mergeSpan - 9}" ss:StyleID="MetaVal">
          <Data ss:Type="String">Gió GO &lt;= ${thresholds?.windSpeedGo ?? 20}km/h (Cảnh báo &lt;= ${thresholds?.windSpeedCaution ?? 28}km/h), Mưa &lt;= ${thresholds?.precipitationGo ?? 0.5}mm</Data>
        </Cell>
      </Row>

      <!-- Formal Legend Box (NO ICONS, NO EMOJI) -->
      <Row ss:Height="20">
        <Cell ss:StyleID="CellGo"><Data ss:Type="String">6h / 3h</Data></Cell>
        <Cell ss:MergeAcross="3" ss:StyleID="LegendText"><Data ss:Type="String">ĐẠT (GO): Thời tiết thuận lợi, đáp ứng tiêu chuẩn cất cánh</Data></Cell>
        <Cell ss:StyleID="CellCaution"><Data ss:Type="String">2h / 1h</Data></Cell>
        <Cell ss:MergeAcross="4" ss:StyleID="LegendText"><Data ss:Type="String">CẢNH BÁO (CAUTION): Cận biên an toàn, theo dõi gió và mây đối lưu</Data></Cell>
        <Cell ss:StyleID="CellNoGo"><Data ss:Type="String">0h</Data></Cell>
        <Cell ss:MergeAcross="${mergeSpan - 11}" ss:StyleID="LegendText"><Data ss:Type="String">KHÔNG ĐẠT (NO GO): Không đủ điều kiện an toàn bay, đình chỉ cất cánh</Data></Cell>
      </Row>
      <Row ss:Height="8"/>

      <!-- 2-Tier Header: Level 1 -->
      <Row ss:Height="24">
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">STT</Data></Cell>
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">Tỉnh/TP (Mới)</Data></Cell>
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">Khu vực</Data></Cell>
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">Quận / Huyện / TX</Data></Cell>
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">Xã / Phường / Thị trấn</Data></Cell>
        ${dates
      .map((d, idx) => {
        const dayLabel = idx === 0 ? "HÔM NAY" : d.dayOfWeek.toUpperCase();
        const dateShort = d.date.substring(5).replace("-", "/");
        return `<Cell ss:MergeAcross="1" ss:StyleID="TableHeaderL1"><Data ss:Type="String">${escapeXml(dayLabel)} (${escapeXml(dateShort)})</Data></Cell>`;
      })
      .join("\n        ")}
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">Tổng giờ bay</Data></Cell>
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">Số ca đạt</Data></Cell>
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">Tỷ lệ</Data></Cell>
        <Cell ss:StyleID="TableHeaderL1"><Data ss:Type="String">Đánh giá &amp; Khuyến nghị</Data></Cell>
      </Row>

      <!-- 2-Tier Header: Level 2 -->
      <Row ss:Height="22">
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">#</Data></Cell>
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">(Cấp Tỉnh)</Data></Cell>
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">(Phân vùng)</Data></Cell>
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">(Cấp Huyện)</Data></Cell>
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">(Cấp Cơ sở)</Data></Cell>
        ${dates
      .map(
        () =>
          `<Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">Sáng (06-12h)</Data></Cell>\n        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">Chiều (12-18h)</Data></Cell>`
      )
      .join("\n        ")}
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">(7 ngày)</Data></Cell>
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">(/14 ca)</Data></Cell>
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">(%)</Data></Cell>
        <Cell ss:StyleID="TableHeaderL2"><Data ss:Type="String">Phương án tác chiến</Data></Cell>
      </Row>

      <!-- Data Rows Grouped by Region -> District -> Communes -->
      ${regions
      .map((region) => {
        const regionLabel = REGION_LABELS[region.id] || region.label;

        const districtBlocks = region.districts
          .map((district, dIdx) => {
            const dwd = data.get(district.id);
            const communes = district.communes.length > 0 ? district.communes : [district.name];

            let totalDistrictGoHours = 0;
            let goSessionsCount = 0;
            let totalSessions = 0;

            const sessionCells = dates
              .map((d) => {
                const daySummary = dwd?.daySummaries.find((s) => s.date === d.date);
                if (!daySummary) {
                  return `<Cell ss:StyleID="CellCenter"><Data ss:Type="String">-</Data></Cell>\n        <Cell ss:StyleID="CellCenter"><Data ss:Type="String">-</Data></Cell>`;
                }

                totalSessions += 2;
                if (daySummary.morning.condition === "GO") goSessionsCount++;
                if (daySummary.afternoon.condition === "GO") goSessionsCount++;
                totalDistrictGoHours += daySummary.morning.goHours + daySummary.afternoon.goHours;

                const getCellStyle = (cond: FlightCondition) =>
                  cond === "GO" ? "CellGo" : cond === "CAUTION" ? "CellCaution" : "CellNoGo";

                // Pure numerical / hour string, NO '✕', NO ICON
                const getCellContent = (goHours: number, cond: FlightCondition) =>
                  cond === "NO_GO" ? "0h" : `${goHours}h`;

                const mStyle = getCellStyle(daySummary.morning.condition);
                const aStyle = getCellStyle(daySummary.afternoon.condition);
                const mText = getCellContent(daySummary.morning.goHours, daySummary.morning.condition);
                const aText = getCellContent(daySummary.afternoon.goHours, daySummary.afternoon.condition);

                return `<Cell ss:StyleID="${mStyle}"><Data ss:Type="String">${escapeXml(mText)}</Data></Cell>\n        <Cell ss:StyleID="${aStyle}"><Data ss:Type="String">${escapeXml(aText)}</Data></Cell>`;
              })
              .join("\n        ");

            const availabilityPercent =
              totalSessions > 0 ? Math.round((goSessionsCount / totalSessions) * 100) : 0;

            const recommendation =
              totalDistrictGoHours >= 28
                ? "Rất thuận lợi, ưu tiên phân công tuyến bay"
                : totalDistrictGoHours >= 14
                  ? "Thuận lợi, chú ý diễn biến gió ca chiều"
                  : totalDistrictGoHours >= 7
                    ? "Cần chọn lọc kỹ từng khung giờ đạt chuẩn"
                    : "Hạn chế bay, chuẩn bị phương án ứng phó thời tiết";

            // Commune rows
            const communeRows = communes
              .map((commune) => {
                globalCommuneCounter++;
                return `
      <Row ss:Height="22">
        <Cell ss:StyleID="CellCenter"><Data ss:Type="Number">${globalCommuneCounter}</Data></Cell>
        <Cell ss:StyleID="CellCenter"><Data ss:Type="String">${escapeXml(NEW_PROVINCE_SHORT_NAME)}</Data></Cell>
        <Cell ss:StyleID="CellCenter"><Data ss:Type="String">${escapeXml(regionLabel)}</Data></Cell>
        <Cell ss:StyleID="CellNormal"><Data ss:Type="String">${escapeXml(district.name)}</Data></Cell>
        <Cell ss:StyleID="CellNormal"><Data ss:Type="String">${escapeXml(commune)}</Data></Cell>
        ${sessionCells}
        <Cell ss:StyleID="CellNumber"><Data ss:Type="Number">${totalDistrictGoHours}</Data></Cell>
        <Cell ss:StyleID="CellCenter"><Data ss:Type="String">${goSessionsCount}/${totalSessions}</Data></Cell>
        <Cell ss:StyleID="CellCenter"><Data ss:Type="String">${availabilityPercent}%</Data></Cell>
        <Cell ss:StyleID="CellNormal"><Data ss:Type="String">${escapeXml(recommendation)}</Data></Cell>
      </Row>`;
              })
              .join("");

            // District Subtotal Row
            return `
      <!-- District Section Header -->
      <Row ss:Height="24">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="DistrictHeader">
          <Data ss:Type="String">${dIdx + 1}. ĐƠN VỊ HÀNH CHÍNH: ${escapeXml(district.name.toUpperCase())} (${communes.length} ĐƠN VỊ CẤP XÃ/PHƯỜNG TRỰC THUỘC)</Data>
        </Cell>
      </Row>
      ${communeRows}
      <!-- District Subtotal Row -->
      <Row ss:Height="22">
        <Cell ss:MergeAcross="4" ss:StyleID="CellSubtotalLeft">
          <Data ss:Type="String">TỔNG HỢP / CHỈ SỐ ĐẠI DIỆN ${escapeXml(district.name.toUpperCase())}</Data>
        </Cell>
        ${sessionCells}
        <Cell ss:StyleID="CellSubtotal"><Data ss:Type="Number">${totalDistrictGoHours}</Data></Cell>
        <Cell ss:StyleID="CellSubtotal"><Data ss:Type="String">${goSessionsCount}/${totalSessions}</Data></Cell>
        <Cell ss:StyleID="CellSubtotal"><Data ss:Type="String">${availabilityPercent}%</Data></Cell>
        <Cell ss:StyleID="CellSubtotalLeft"><Data ss:Type="String">Đại diện chung địa bàn ${escapeXml(district.name)}</Data></Cell>
      </Row>`;
          })
          .join("");

        return `
      <!-- Region Section Banner -->
      <Row ss:Height="26">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="RegionHeader">
          <Data ss:Type="String">${escapeXml(region.label.toUpperCase())}</Data>
        </Cell>
      </Row>
      ${districtBlocks}`;
      })
      .join("")}

      <Row ss:Height="12"/>

      <!-- Operational Dispatch Guidelines (Formal text) -->
      <Row ss:Height="22">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="SubTitle">
          <Data ss:Type="String">QUY ĐỊNH AN TOÀN VÀ HƯỚNG DẪN TỔ CHỨC BAY THEO CA TÁC CHIẾN</Data>
        </Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="CellNormal">
          <Data ss:Type="String">1. Ca Sáng (06:00 - 12:00): Vận tốc gió trung bình êm dịu, ưu tiên thực hiện các tuyến bay đo đạc trắc địa và khảo sát 3D độ phân giải cao.</Data>
        </Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="CellNormal">
          <Data ss:Type="String">2. Ca Chiều (12:00 - 18:00): Thường xuyên có hiện tượng đối lưu nhiệt và gió tăng cường, bắt buộc kiểm tra dữ liệu Radar thời tiết trước khi cất cánh.</Data>
        </Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="CellNormal">
          <Data ss:Type="String">3. Khi ô dữ liệu ghi nhận 0h (Không đạt): Tuyệt đối nghiêm cấm cất cánh đối với các chuyến bay ngoài tầm nhìn (BVLOS).</Data>
        </Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:MergeAcross="${mergeSpan}" ss:StyleID="CellNormal">
          <Data ss:Type="String">4. Danh mục đơn vị hành chính chuẩn hóa theo Nghị quyết sắp xếp đơn vị hành chính mới (Mô hình 34 tỉnh thành Việt Nam - Tỉnh Gia Lai mới).</Data>
        </Cell>
      </Row>

      <Row ss:Height="20"/>

      <!-- Sign-off Block (Khung Phê duyệt Hành chính) -->
      <Row ss:Height="22">
        <Cell ss:MergeAcross="4" ss:StyleID="SignHeader">
          <Data ss:Type="String">NGƯỜI LẬP BÁO CÁO</Data>
        </Cell>
        <Cell ss:MergeAcross="${mergeSpan - 5}" ss:StyleID="SignHeader">
          <Data ss:Type="String">CHỈ HUY TÁC CHIẾN BAY / LÃNH ĐẠO PHÊ DUYỆT</Data>
        </Cell>
      </Row>
      <Row ss:Height="18">
        <Cell ss:MergeAcross="4" ss:SignNote">
          <Data ss:Type="String">(Ký, ghi rõ họ tên)</Data>
        </Cell>
        <Cell ss:MergeAcross="${mergeSpan - 5}" ss:StyleID="SignNote">
          <Data ss:Type="String">(Ký, ghi rõ họ tên và đóng dấu)</Data>
        </Cell>
      </Row>
      <Row ss:Height="40"/>
    </Table>
  </Worksheet>
  `;
}

/**
 * Main Export Function: Export Commune-Level Flight Plan Matrix to Microsoft Excel (.xls XML SpreadsheetML)
 */
export function exportCommuneDetailedMatrixToExcel(
  data: Map<string, DistrictWeatherData>,
  options?: {
    districtIdFilter?: string;
    thresholds?: FlightThresholds;
  }
) {
  if (!data || data.size === 0) {
    alert("Chưa có dữ liệu thời tiết để xuất Excel. Vui lòng chờ tải xong dữ liệu.");
    return;
  }

  const { districtIdFilter, thresholds } = options || {};
  const worksheetXml = generateCommuneDetailedWorksheetXml(data, { districtIdFilter, thresholds });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  ${generateCommuneExcelStyles()}
  ${worksheetXml}
</Workbook>`;

  const todayStr = new Date().toISOString().substring(0, 10).replace(/-/g, "");
  const targetDistrict = districtIdFilter
    ? GIA_LAI_DISTRICTS.find((d) => d.id === districtIdFilter)
    : null;

  const fileNameSuffix = targetDistrict
    ? `_Chi_tiet_${targetDistrict.id}`
    : "_Toan_tinh_28_huyen_xa_phuong";

  const blob = new Blob([xmlContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Bao_cao_lich_bay_cap_xa_${NEW_PROVINCE_SHORT_NAME.replace(/\s+/g, "_")}${fileNameSuffix}_${todayStr}.xls`;
  link.click();
  URL.revokeObjectURL(url);
}
