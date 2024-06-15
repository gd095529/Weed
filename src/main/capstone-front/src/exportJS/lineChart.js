import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", '100%')
            .attr("height", '100%')
            .style("background", "#ffffff")
            .style("overflow", "visible");

        // 기존 축과 라인 제거 (갱신 시 중복 제거)
        svg.selectAll("*").remove();

        // 데이터에서 y축의 최소값과 최대값 찾기
        const yMin = d3.min(data, (d) => d.y);
        const yMax = d3.max(data, (d) => d.y);

        // X 축과 Y 축의 스케일 설정
        const xScale = d3.scalePoint()
            .domain(data.map((d) => d.x))
            .range([0, 800]);

        const yScale = d3.scaleLinear()
            .domain([yMin - yMax * 0.1, yMax + yMax * 0.1]) // y축의 범위를 확대하여 중앙에 배치
            .range([400, 0]);

        // X 축과 Y 축 생성
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).ticks(10);

        // X 축과 Y 축을 SVG에 추가
        svg.append("g")
            .call(xAxis)
            .attr("transform", "translate(0, 400)");

        svg.append("g")
            .call(yAxis);

        // 라인 생성 함수 정의
        const line = d3.line()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y));

        // 데이터를 기반으로 라인 추가
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // 데이터를 기반으로 점 추가
        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y))
            .attr("r", 3)
            .attr("fill", "black");

    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default LineChart;
