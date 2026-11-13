#!/usr/bin/env bash
# Re-encodes the chosen finished videos into small web clips + poster frames.
set -u
F="/f/WORK/FIlmaking"
OUT="/f/Claude/portfolio-site/public/media/reels"
while IFS='|' read -r id src; do
  [ -z "$id" ] && continue
  [ -f "$OUT/$id.mp4" ] && continue
  ffmpeg -nostdin -hide_banner -loglevel error -y -i "$F/$src" -vf "scale=540:960:force_original_aspect_ratio=decrease,pad=540:960:(ow-iw)/2:(oh-ih)/2,fps=30" \
    -c:v libx264 -preset slow -crf 27 -profile:v high -pix_fmt yuv420p -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/$id.mp4" && \
  ffmpeg -nostdin -hide_banner -loglevel error -y -ss 2.5 -i "$OUT/$id.mp4" -frames:v 1 -c:v libwebp -quality 78 "$OUT/$id.webp" && \
  echo "OK $id $(du -k "$OUT/$id.mp4" | cut -f1)KB $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$id.mp4")s"
done <<'LIST'
caterpillar|October 2026/10-12-2026 = zack caterpillars/FINAL/CaterpillarCircle_Construct_FINAL.mp4
rat-bounty|October 2026/10-05-2026 = zack/FINAL/Hook1_Original/RatBounty_Hook1_fleaKept.mp4
pig-wolf|October 2026/10-05-2026/FINAL/Construct_PhoneAttention_PigWolf_v10_1080x1920_upload.mp4
monk-fascia|November 2026/11-03-2026 Monk Fascia/edit/exports/MonkFascia_A_FINAL_graded_share.mp4
monk-lymphatic|November 2026/11-04-2026 Monk Lymphatic/edit/exports/MonkLymphatic_A_FINAL.mp4
talking-pelvis|November 2026/11-06-2026 Talking Pelvis/edit/FINAL/Lymph - Belly pooch, leaking & back pain - Stop the hip opener - Women - AI animation talking pelvis - Aura Swipe  (1).mp4
foam-head-dyslexia|November 2026/11-09-2026 Dyslexia Foam Head/FINAL/Dyslexia_V2_woman30_FINAL.mp4
foam-head-dementia|November 2026/11-10-2026 Dementia Foam Head/FINAL/IQ - Dementia Starts Silently - White Coat + Score Head - Man & Woman 45+ - MyIQ Swipe (1).mp4
selfie-kitchen|November 2026/11-11-2026 Are You Single/FINAL/share/AreYouSingle_V1_kitchen_share.mp4
green-screen-news|November 2026/11-11-2026 GenZ vs Parents/FINAL/IQ - Gen Z vs Parents - Green Screen News + Reactions - New Concept (1).mp4
podcast-woman|October 2026/10-25-2026 RiseGuide/FINAL/Charisma - Never Say Sorry - Asian Woman 47 Podcast.mp4
podcast-man|October 2026/10-27-2026 UGC Male/final/Charisma - Small Talk Killers - American Man 48 - Podcast - Riseguide Swipe - November_small.mp4
stage-talk|October 2026/10-28-2026/final/InterviewQ_STAGE_FINAL_small.mp4
split-screen|October 2026/10-12-2026 Genjutsu/FINAL/Memory_Eidetic_SplitScreen_v4_HQ_bigger.mp4
history-lesson|October 2026/10-01-2026/production/final/Marcus_L4_Inner_Scorecard_9x16_tight.mp4
avatar-ugc|October 2026/10-21-2026/polymath_ugc/final_edit/exports/Construct_ScriptA_captions_v5.mp4
challenge-ugc|November 2026/11-02-2026 BetterMe/FINAL/LymphChallenge_30-40.mp4
lesson-napoleon|October 2026/10-02-2026/Napoleon, lesson 4 Too Many Words.mp4
lesson-noah|October 2026/10-09-2026/Noah Ark - Time Travel AI - Social Media.mp4
lesson-machiavelli-robes|October 2026/10-11-2026/Machiavelli, Lesson 3 The Bishop's Robes.mp4
lesson-machiavelli-name|October 2026/10-14-2026/Machiavelli, Lesson 4 Make Them Name It v2.mp4
lesson-tesla|October 2026/10-06-2026/1007_2_1080p_Serif_Header_Softer.mp4
LIST
echo DONE
