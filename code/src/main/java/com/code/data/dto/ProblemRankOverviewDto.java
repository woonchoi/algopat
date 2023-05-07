package com.code.data.dto;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProblemRankOverviewDto {
  private long problemId;
  private String problemTitle;
  private long problemLevel;
  private long problemSubmittedCount;
  private String userNickname;

}
