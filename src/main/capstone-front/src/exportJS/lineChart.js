// src/LineChart.js
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

        // X 축과 Y 축의 스케일 설정
        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 800]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([400, 0]);

        // X 축과 Y 축 생성
        const xAxis = d3.axisBottom(xScale).ticks(data.length);
        const yAxis = d3.axisLeft(yScale).ticks(5);

        // X 축과 Y 축을 SVG에 추가
        svg.append("g")
            .call(xAxis)
            .attr("transform", "translate(0, 400)");

        svg.append("g")
            .call(yAxis);

        // 라인 생성 함수 정의
        const line = d3.line()
            .x((d, i) => xScale(i))
            .y(yScale);

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
            .attr("cx", (d, i) => xScale(i))
            .attr("cy", (d) => yScale(d))
            .attr("r", 5)
            .attr("fill", "black");

    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default LineChart;
